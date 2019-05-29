const { spawn } = require("child_process");
const ls = spawn("mkdir", ["cd"]);

ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
    spawn("mkdir", ["cd"]);
});

ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
    spawn("mkdir", ["cd"]);
});
