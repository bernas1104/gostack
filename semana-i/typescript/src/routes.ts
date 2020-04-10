import { Request, Response } from 'express';

import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'bernardoc1104@gmail.com', 
    password: '123456',
    techs: ['Node.JS', 'ReactJS', 'React Native'],
  });

  return response.json(user);
}