/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const utf8 = 'utf8';
const file ='file';
const url ='url';


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
  }
  
  
  /** read file and generate text from it. */
  
  function makeText(path) {
    fs.readFile(path, utf8, (error, data)=> {
      if (error) {
        console.error(`Failed to read file: ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
  
  }
  
  
  /** read URL and make text from it. */
  
  
  async function makeURLText(url) {
    let res;
  
    try {
      res = await axios.get(url);
    } catch (error) {
      console.error(`Cannot read URL: ${url}: ${error}`);
      process.exit(1);
    }
    generateText(res.data)
  }
  
  
  /** interpret command line to decide what to do. */
  
  let [method, path] = process.argv.slice(2);
  
  if (method === file) {
    makeText(path);
  }
  
  else if (method === url) {
    makeURLText(path);
  }
  
  else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
  }
  