## Compile all dependencies

Since this code needs to run in Node env inside the command line, all codes need
to be env compatible, so you need to compile them using babel.
The script to compile is `babel [src_filename].js --out-file [src_filename-compiled].js`

> Note: Headless render props and model are already compiled using the same script.

## Run in command line

Use the script `yarn serve` to run the cli GUI in command line.
