# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

CodeFile.create!([
  { filename: 'code/helloWorld.js',       content: "console.log('hello world')" },
  { filename: 'code/general/example.txt', content: ':3' },
  { filename: 'code/general/README.md', content: '# README' },
  { filename: 'code/config/bashrc', content: "alias tem='curl wttr.in'" },
  { filename: 'code/config/hello_world.txt', content: "  _            _  _                                  _     _\n\
 | |__    ___ | || |  ___    __      __  ___   _ __ | | __| |\n\
 | '_ \\  / _ \\| || | / _ \\   \\ \\ /\\ / / / _ \\ | '__|| |/ _` |\n\
 | | | ||  __/| || || (_) |   \\ V  V / | (_) || |   | | (_| |\n\
 |_| |_| \\___||_||_| \\___/     \\_/\\_/   \\___/ |_|   |_|\\__,_|\n\
                                                             " },
])
