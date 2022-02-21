#!/usr/bin/env node
const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;
