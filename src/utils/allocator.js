function Allocator(initialState) {
  this.queue = initialState.map(x => x);
  this.currentState = Array(50).fill(null);
  this.history = [];
  this.finished = false;
}

Allocator.prototype.tick = function() {
  const newJob = this.queue.shift();

  const isNewFile = newJob.size !== -1;

  if (isNewFile) {
    this.addFile(newJob);
  } else {
    this.removeFile(newJob);
  }

  this.snapshot();

  if (this.queue.length === 0) this.finished = true;
};

Allocator.prototype.addFile = function(file) {
  let unaddedBlockCount = file.size;

  for (let i = 0; i < this.currentState.length; i++) {
    if (this.currentState[i] === null) {
      this.currentState[i] = file.letter;
      unaddedBlockCount -= 1;
      if (unaddedBlockCount === 0) break;
    }
  }
  if (unaddedBlockCount > 0) {
    throw new Error(`File ${file.letter} did not fit!`);
  }
};

Allocator.prototype.removeFile = function(file) {
  for (let i = 0; i < this.currentState.length; i++) {
    if (this.currentState[i] === file.letter) {
      this.currentState[i] = null;
    }
  }
};

Allocator.prototype.snapshot = function() {
  this.history.push(this.currentState.slice());
};

Allocator.prototype.getFragmentedFiles = function() {
  const allFiles = [];
  const fragmentedFiles = [];

  let previousBlock;

  for (let i = 0; i < this.currentState.length; i++) {
    const currentBlock = this.currentState[i];

    if (currentBlock) {
      if (allFiles.find(e => e.letter === currentBlock)) {
        allFiles.find(e => e.letter === currentBlock).count++;
        if (
          previousBlock !== currentBlock &&
          !fragmentedFiles.includes(currentBlock)
        ) {
          fragmentedFiles.push({ letter: currentBlock });
        }
      } else {
        allFiles.push({ letter: currentBlock, count: 1 });
      }
    }

    previousBlock = currentBlock;
  }
  return {
    allFiles,
    fragmentedFiles
  };
};

Allocator.prototype.getFragmentationCountPercent = function() {
  const { allFiles, fragmentedFiles } = this.getFragmentedFiles();

  return Math.round((fragmentedFiles.length / allFiles.length) * 10000) / 100;
};

Allocator.prototype.getFragmentationSpacePercent = function() {
  const { allFiles, fragmentedFiles } = this.getFragmentedFiles();

  const allFilesSize = allFiles.reduce((acc, curr) => acc + curr.count, 0);
  const fragmentedFileSize = fragmentedFiles.reduce((acc, curr) => {
    const fileSize = allFiles.find(file => file.letter === curr.letter).count;
    return acc + fileSize;
  }, 0);

  return Math.round((fragmentedFileSize / allFilesSize) * 10000) / 100;
};

export default Allocator;
