import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequsetValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

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

    // if errors is not empty
    if (!errors.isEmpty()) {
      throw new RequsetValidationError(errors.array())
    }

    const { email, password } = req.body;

    console.log('Creating a user');
    throw new DatabaseConnectionError()

    res.send({})
  })


export { router as signupRouter };
