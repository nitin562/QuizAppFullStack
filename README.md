
# Quiz App

### It is the quiz app that contains 10 questions and fetched from express backend server and display via react framework

## Run Locally

Clone the project

```bash
  git clone https://github.com/nitin562/QuizAppFullStack.git
```

Go to the project Backend directory

```bash
  cd QuizAppFullStack/Backend
```

Install dependencies

```bash
  npm install
```

Start the Backend server and port is 8000 so make sure no other application is running on port 8000 as it can deflect app run

```bash
  npm start
```
open new terminal and 
Go to Client directory
```bash
  cd QuizAppFullStack/Client
  ```

Install Packages
```bash
npm install
```

Run the App 
```bash
npm run dev
```

## Evalution of Score
Each correct answer gives 1 marks.

Each wrong answer gives 0 mark.

Each violation of rule reduce score by 1.
### Hence total marks is (correct-violation)*100/10
