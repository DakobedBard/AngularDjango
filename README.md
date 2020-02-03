This project uses Angular 8 for it front end and uses the Django Rest Framework.

This application allows a user to upload an audio recording of them playing solo guitar, which the application will
attempt to generate a guitar tablature for using the model that I have trained using the Keras library and on an EC2 instance.

clone the repository

docker-compose up       // Will start the django backend 
npm install             // Install the dependencies
ng serve                // run the angular application.  



Now I am working on incoporating my neural network code

- Launch the EC2 instance 