import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();
/**
 * @post is the method
 * @signin is the router whihc facilitaes user to signin 
 * @signinUser awaits till findind the user by following credentias
 * takes emial and password  and checks
 * if @isAdmin is true
 * if @status is 401 then the creadentails are incorrect
 */


router.put('/:id', isAuth, async (req, res) => {
	const userId = req.params.id;
	const user = await User.findById(userId);
	if (user) {
	  user.name = req.body.name || user.name;
	  user.email = req.body.email || user.email;
	  user.password = req.body.password || user.password;
	  const updatedUser = await user.save();
	  res.send({
		_id: updatedUser.id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: getToken(updatedUser)
	  });
	} else {
	  res.status(404).send({ msg: 'User Not Found' });
	}
  
  }); 
router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
      	email: req.body.email,
      	password: req.body.password
    });
  	if (signinUser) {
	    res.send({
    		_id: signinUser.id,
      		name: signinUser.name,
      		email: signinUser.email,
      		isAdmin: signinUser.isAdmin,
      		token: getToken(signinUser)
    	})
	}
	else {
    	res.status(401).send({ msg: 'Invalid Email or Password.' });
  	}
})
/**
 * @post the method is the post
 * @register is the router which facilitates users to register into our website
 * @user an new user is created by having the folowing
 * @name a user musthave name
 * @email must have mail
 * @password must have password
 * @newUser a new user is created and saved into the db
 * @_id is the id assigned to the user
 */
router.post('/register', async (req, res) => {
  	const user = new User({
    	name: req.body.name,
    	email: req.body.email,
    	password: req.body.password
  	});
  	const newUser = await user.save();
  	if (newUser) {
    	res.send({
      		_id: newUser.id,
      		name: newUser.name,
      		email: newUser.email,
      		isAdmin: newUser.isAdmin,
      		token: getToken(newUser)
    	})
	}
	else {
    	res.status(401).send({ msg: 'Invalid User Data.' });
  	}
})
/**
 * @get is the method and @/admin is the route
 * @user is created by the credentials of the user and is added to mongodb
 * @isAdmin is set to true stating that user with below credetails are admin's
 */
router.get("/admin", async (req, res) => {
  try {
    const user = new User({
      name: 'Harika',
      email: 'gurralaharika21@gmail.com',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;