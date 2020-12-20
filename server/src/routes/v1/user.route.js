const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/create').post(validate(userValidation.createUser), userController.createUser);

router.route('/update_password').put(validate(userValidation.updatePassword), userController.updatePassword);

router.route('/authenticate').post(validate(userValidation.authenticateUser), userController.authenticateUser);

router.route('/:id').get(validate(userValidation.getUser), userController.getUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
/**
 * @swagger
 * path:
 *  /users/{id}:
 *    get:
 *      summary: Get a user
 *      description: Get a single user.
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
