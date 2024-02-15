import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequsetValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post('/api/users/signup',
  [
    body('email') // 'email' property
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {

    const errors = validationResult(req);

    // if it have errors
    if (!errors.isEmpty()) {
      throw new RequsetValidationError(errors.array())
    }


    const { email, password } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password })
    await user.save()

    res.status(201).send(user)
  })


export { router as signupRouter };
