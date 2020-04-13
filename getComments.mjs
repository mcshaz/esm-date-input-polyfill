import { readFile } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

readFile(__dirname + '/src/languages.mjs', 'utf8', (err, doc) => {
    const matchComment = /\/\/ (.+)/g;
    let comment;
    let comments = [];
    matchComment.exec(doc)
    while (comment = matchComment.exec(doc)) {
        comments.push(comment[1]);
    }
    comments.sort();
    console.log(comments.join(', '));
});
