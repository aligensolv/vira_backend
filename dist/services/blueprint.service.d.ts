import Handlebars from 'handlebars';
/**
 * @file BlueprintService
 * @description A singleton service for loading, caching, and rendering communication blueprints.
 *              It handles HTML, plain text, and JSON blueprints using Handlebars template engine,
 *              and supports a nested directory structure.
 */
export type BlueprintData = Record<string, any>;
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
export declare class BlueprintService {
    private static instance;
    private cache;
    private readonly blueprintsDir;
    private constructor();
    /**
   * Automatically registers all partials found in the blueprints directory.
   * Partials are files whose names start with an underscore (_).
   * The partial name will be the relative path (dot notation) without the leading underscore and extension.
   * Example: '_header.html' in 'email/' becomes 'email.header'
   */
    registerAllPartials(): Promise<void>;
    static getInstance(): BlueprintService;
    /**
     * Register common Handlebars helpers
     * @private
     */
    private registerHelpers;
    /**
     * Register a custom Handlebars helper
     * @param {string} name - The name of the helper
     * @param {Function} helper - The helper function
     */
    registerHelper(name: string, helper: Handlebars.HelperDelegate): void;
    /**
     * Register a partial manually
     * @param {string} name - The name of the partial
     * @param {string} template - The partial template content
     */
    registerPartial(name: string, template: string): void;
    /**
     * Register multiple partials from an object
     * @param {Record<string, string>} partials - Object with partial names as keys and templates as values
     */
    registerPartials(partials: Record<string, string>): void;
    /**
     * Load and register a partial from a file path
     * @param {string} name - The name to register the partial as
     * @param {string} filePath - The path to the partial file (relative to blueprints directory)
     */
    registerPartialFromFile(name: string, filePath: string): Promise<void>;
    /**
     * Render a blueprint as a partial (useful for including one blueprint in another)
     * @param {string} blueprintName - The name of the blueprint to render as partial
     * @param {BlueprintData} data - The data to pass to the template
     * @returns {string} The rendered template content
     */
    renderAsPartial(blueprintName: string, data?: BlueprintData): string;
    /**
     * Clears the cache and recursively loads all blueprint files from the base blueprints directory.
     * This should be called once on application startup.
     * @returns {Promise<void>}
     */
    loadBlueprints(): Promise<void>;
    /**
     * Recursively traverses a directory, reading files and generating cache keys based on their path.
     * @private
     * @param {string} directory - The current directory to traverse.
     */
    private _loadFromDirectory;
    private getBlueprint;
    /**
     * Render a blueprint with the provided data using Handlebars
     * @param {string} blueprintName - The name of the blueprint to render
     * @param {BlueprintData} data - The data to pass to the template
     * @returns {string} The rendered template
     */
    render(blueprintName: string, data?: BlueprintData): string;
    /**
     * Render a JSON blueprint and parse the result
     * @param {string} blueprintName - The name of the JSON blueprint to render
     * @param {BlueprintData} data - The data to pass to the template
     * @returns {T} The parsed JSON object
     */
    renderJson<T>(blueprintName: string, data?: BlueprintData): T;
    /**
     * Get the list of all loaded blueprint names
     * @returns {string[]} Array of blueprint names
     */
    getAvailableBlueprints(): string[];
    /**
     * Check if a blueprint exists
     * @param {string} blueprintName - The name of the blueprint to check
     * @returns {boolean} True if the blueprint exists
     */
    hasBlueprint(blueprintName: string): boolean;
}
