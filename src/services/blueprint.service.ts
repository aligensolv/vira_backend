/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises'
import path from 'path'
import Handlebars from 'handlebars'

/**
 * @file BlueprintService
 * @description A singleton service for loading, caching, and rendering communication blueprints.
 *              It handles HTML, plain text, and JSON blueprints using Handlebars template engine,
 *              and supports a nested directory structure.
 */

export type BlueprintData = Record<string, any> // Changed from string | number to any for Handlebars flexibility
type BlueprintCache = Record<string, HandlebarsTemplateDelegate>

/**
 * @class BlueprintService
 * @classdesc Manages all blueprint-related operations using Handlebars template engine.
 *
 * @example
 * // Assuming a blueprint exists at 'src/core/blueprints/email/welcome_email.html'
 * // Content: <h1>Hello {{username}}!</h1>{{#if premium}}<p>Welcome to premium!</p>{{/if}}
 *
 * // In your main server file (e.g., index.ts)
 * const blueprintService = BlueprintService.getInstance()
 * await blueprintService.loadBlueprints() // Loads all blueprints recursively on startup
 *
 * // In a route or another service
 * const html = blueprintService.render('email.welcome_email', { 
 *   username: 'Alex', 
 *   premium: true 
 * })
 * const notification = blueprintService.renderJson('push.general_alert', { 
 *   title: 'New Login',
 *   user: { name: 'Alex', id: 123 }
 * })
 */
export class BlueprintService {
  private static instance: BlueprintService
  private cache: BlueprintCache = {}
  private readonly blueprintsDir: string

  private constructor() {
    // Updated path to the blueprints directory.
    this.blueprintsDir = path.join(__dirname, '..', 'blueprints')

    // Register common Handlebars helpers
    this.registerHelpers()
  }

  /**
 * Automatically registers all partials found in the blueprints directory.
 * Partials are files whose names start with an underscore (_).
 * The partial name will be the relative path (dot notation) without the leading underscore and extension.
 * Example: '_header.html' in 'email/' becomes 'email.header'
 */
  public async registerAllPartials() {
    const partials: Record<string, string> = {}
    const collectPartials = async (directory: string) => {
      const entries = await fs.readdir(directory, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name)
        if (entry.isDirectory()) {
          await collectPartials(fullPath)
        } else if (entry.isFile() && entry.name.startsWith('_')) {
          // const relativePath = path.relative(this.blueprintsDir, fullPath)
          // Remove leading underscore and extension, convert path to dot notation
          // const keyWithExt = relativePath.replace(/[\\/]/g, '.') // a\b.html -> a.b.html
          // const keyWithoutUnderscore = keyWithExt.replace(/^_/, '').replace(/\._/, '.') // Remove leading _ from filename
            // Only use the filename (without folder) as the partial name
            const fileName = path.basename(entry.name)
            const partialName = fileName.startsWith('_') 
            ? fileName.substring(1, fileName.lastIndexOf('.')) 
            : fileName.substring(0, fileName.lastIndexOf('.'))

            const content = await fs.readFile(fullPath, 'utf-8')
          
          partials[partialName] = content

          console.log(partials)
          
        }
      }
    }
    await collectPartials(this.blueprintsDir)
    this.registerPartials(partials)
    console.log(`[BlueprintService] Registered ${Object.keys(partials).length} partials:`, Object.keys(partials))
  }

  public static getInstance(): BlueprintService {
    if (!BlueprintService.instance) {
      BlueprintService.instance = new BlueprintService()
    }
    return BlueprintService.instance
  }

  /**
   * Register common Handlebars helpers
   * @private
   */
  private registerHelpers(): void {
    // Register a helper for JSON stringification (useful for JSON blueprints)
    Handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context)
    })

    // Register a helper for date formatting
    Handlebars.registerHelper('formatDate', function (date) {
      if (!date) return ''
      const d = new Date(date)
      // Simple date formatting - you might want to use a library like date-fns
      return d.toISOString().split('T')[0] // Returns YYYY-MM-DD
    })

    // Register a helper for uppercase
    Handlebars.registerHelper('uppercase', function (str) {
      return str ? str.toString().toUpperCase() : ''
    })

    // Register a helper for lowercase
    Handlebars.registerHelper('lowercase', function (str) {
      return str ? str.toString().toLowerCase() : ''
    })
  }

  /**
   * Register a custom Handlebars helper
   * @param {string} name - The name of the helper
   * @param {Function} helper - The helper function
   */
  public registerHelper(name: string, helper: Handlebars.HelperDelegate): void {
    Handlebars.registerHelper(name, helper)
  }

  /**
   * Register a partial manually
   * @param {string} name - The name of the partial
   * @param {string} template - The partial template content
   */
  public registerPartial(name: string, template: string): void {
    Handlebars.registerPartial(name, template)
  }

  /**
   * Register multiple partials from an object
   * @param {Record<string, string>} partials - Object with partial names as keys and templates as values
   */
  public registerPartials(partials: Record<string, string>): void {
    for (const [name, template] of Object.entries(partials)) {
      Handlebars.registerPartial(name, template)
    }
  }

  /**
   * Load and register a partial from a file path
   * @param {string} name - The name to register the partial as
   * @param {string} filePath - The path to the partial file (relative to blueprints directory)
   */
  public async registerPartialFromFile(name: string, filePath: string): Promise<void> {
    try {
      const fullPath = path.join(this.blueprintsDir, filePath)
      const content = await fs.readFile(fullPath, 'utf-8')
      Handlebars.registerPartial(name, content)
      console.log(`[BlueprintService] Registered partial "${name}" from file: ${filePath}`)
    } catch (error) {
      console.error(`[BlueprintService] Failed to register partial "${name}" from file "${filePath}":`, error)
      throw new Error(`Failed to register partial "${name}" from file "${filePath}": ${error}`)
    }
  }

  /**
   * Render a blueprint as a partial (useful for including one blueprint in another)
   * @param {string} blueprintName - The name of the blueprint to render as partial
   * @param {BlueprintData} data - The data to pass to the template
   * @returns {string} The rendered template content
   */
  public renderAsPartial(blueprintName: string, data: BlueprintData = {}): string {
    return this.render(blueprintName, data)
  }

  /**
   * Clears the cache and recursively loads all blueprint files from the base blueprints directory.
   * This should be called once on application startup.
   * @returns {Promise<void>}
   */
  public async loadBlueprints(): Promise<void> {
    try {
      console.log(`[BlueprintService] Loading blueprints from: ${this.blueprintsDir}`)
      this.cache = {} // Clear cache before reloading
      await this._loadFromDirectory(this.blueprintsDir)
      await this.registerAllPartials()

      console.log(`[BlueprintService] Successfully loaded and cached ${Object.keys(this.cache).length} blueprints.`)
    } catch (error) {
      console.error('[BlueprintService] Failed to load blueprints:', error)
      throw new Error('Could not initialize BlueprintService. Failed to load blueprints.')
    }
  }

  /**
   * Recursively traverses a directory, reading files and generating cache keys based on their path.
   * @private
   * @param {string} directory - The current directory to traverse.
   */
  private async _loadFromDirectory(directory: string): Promise<void> {
    // Use withFileTypes: true for efficiency.
    const entries = await fs.readdir(directory, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        // If it's a directory, recurse into it.
        await this._loadFromDirectory(fullPath)
      } else if (entry.isFile()) {
        // If it's a file, process and cache it.
        const relativePath = path.relative(this.blueprintsDir, fullPath)

        // Generate a cache key from the file path.
        // e.g., 'email/welcome_email.html' -> 'email.welcome_email'
        const keyWithExt = relativePath.replace(/[\\/]/g, '.') // a\b.html or a/b.html -> a.b.html
        const cacheKey = keyWithExt.substring(0, keyWithExt.lastIndexOf('.'))

        const content = await fs.readFile(fullPath, 'utf-8')

        try {
          // Compile the template with Handlebars
          const compiledTemplate = Handlebars.compile(content)
          this.cache[cacheKey] = compiledTemplate
        } catch (error) {
          console.error(`[BlueprintService] Failed to compile template "${cacheKey}":`, error)
          throw new Error(`Failed to compile Handlebars template "${cacheKey}": ${error}`)
        }
      }
    }
  }

  private getBlueprint(blueprintName: string): HandlebarsTemplateDelegate {
    const blueprint = this.cache[blueprintName]
    if (!blueprint) {
      throw new Error(`Blueprint "${blueprintName}" not found. Ensure it was loaded on startup and the path is correct (e.g., 'folder.blueprintName').`)
    }
    return blueprint
  }

  /**
   * Render a blueprint with the provided data using Handlebars
   * @param {string} blueprintName - The name of the blueprint to render
   * @param {BlueprintData} data - The data to pass to the template
   * @returns {string} The rendered template
   */
  public render(blueprintName: string, data: BlueprintData = {}): string {
    const template = this.getBlueprint(blueprintName)

    try {
      return template(data)
    } catch (error) {
      console.error(`[BlueprintService] Failed to render template "${blueprintName}":`, error)
      throw new Error(`Failed to render Handlebars template "${blueprintName}": ${error}`)
    }
  }

  /**
   * Render a JSON blueprint and parse the result
   * @param {string} blueprintName - The name of the JSON blueprint to render
   * @param {BlueprintData} data - The data to pass to the template
   * @returns {T} The parsed JSON object
   */
  public renderJson<T>(blueprintName: string, data: BlueprintData = {}): T {
    const renderedString = this.render(blueprintName, data)
    try {
      return JSON.parse(renderedString) as T
    } catch (error) {
      console.error(`[BlueprintService] Failed to parse rendered JSON for blueprint "${blueprintName}". Content: ${renderedString}`)
      throw new Error(`Could not parse rendered JSON for blueprint "${blueprintName}": ${error}.`)
    }
  }

  /**
   * Get the list of all loaded blueprint names
   * @returns {string[]} Array of blueprint names
   */
  public getAvailableBlueprints(): string[] {
    return Object.keys(this.cache)
  }

  /**
   * Check if a blueprint exists
   * @param {string} blueprintName - The name of the blueprint to check
   * @returns {boolean} True if the blueprint exists
   */
  public hasBlueprint(blueprintName: string): boolean {
    return blueprintName in this.cache
  }
}