import { Router } from 'express'
import passport from 'passport'
import { config } from '../configs/app.config'

const authRouter = Router()

const failUrl = `${config.GOOGLE_CALLBACK_URL}?status=fail`

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: failUrl }))
