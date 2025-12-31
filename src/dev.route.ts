import { Router } from "express";
const router = Router()

router.get('/test', async (req , res) => {
  return res.json({
    success: true
  })
})


export { router as TestRoute }