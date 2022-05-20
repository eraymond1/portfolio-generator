const inquirer = require('inquirer');

// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw new Error(err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

const promptUser = () => {

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?(Required)',
      validate:  nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },

    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username (Required)',
      validate: githubInput => {
        if (githubInput){
          return true;
        } else {
          console.log("Please enter your gitHub username!");
          return false;
        }
      }
    },

    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    },

  ]);
  
};

//promptUser().then(answers => console.log(answers));


const promptProject = portfolioData => {
if(!portfolioData.projects){
  portfolioData.projects = [];
}

  
  console.log(`
  =======================
  Add a New Project
  =======================
  
  `);

  return inquirer.prompt([

    {
      type: 'input',
      name: 'name',
      message: 'Waht is the name of your project? (Required)',
      validate: projectNameInput => {
        if (projectNameInput){
          return true;
        } else {
          console.log("Enter gitHub project name!");
          return false;
        }
      }
    },

    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription){
          return true;
        } else {
          console.log("Provide a description of project!");
          return false;
        }
      }
    },

    {
      type: 'checkbox',
      name: 'languages',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },

    {
      type: 'input',
      name:  'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: gitHubLink => {
        if (gitHubLink) {
          return true;
        } else {
          console.log("GitHub Link must be entered!");
          return false;
        }
      }
    },

    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },

    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }

  ]).then(projectData => {
    portfolioData.projects.push(projectData);

    if(projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
}

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});

