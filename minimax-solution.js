// Function to implement minimax algorithm for the number game
function minimax(arr, depth, isMaximizingPlayer, alpha, beta, p1Score, p2Score) {
  // Base case: if no numbers left, compare scores
  if (arr.length === 0) {
    return p1Score - p2Score; // Positive if P1 wins, negative if P2 wins
  }
  
  if (isMaximizingPlayer) {
    let bestVal = -Infinity;
    
    // Try taking from left end
    let leftVal = minimax(
      arr.slice(1), 
      depth + 1, 
      false, 
      alpha, 
      beta, 
      p1Score + arr[0], 
      p2Score
    );
    bestVal = Math.max(bestVal, leftVal);
    alpha = Math.max(alpha, bestVal);
    
    // Try taking from right end
    if (alpha < beta) { // Alpha-beta pruning
      let rightVal = minimax(
        arr.slice(0, arr.length - 1), 
        depth + 1, 
        false, 
        alpha, 
        beta, 
        p1Score + arr[arr.length - 1], 
        p2Score
      );
      bestVal = Math.max(bestVal, rightVal);
      alpha = Math.max(alpha, bestVal);
    }
    
    return bestVal;
  } else {
    let bestVal = Infinity;
    
    // Try taking from left end
    let leftVal = minimax(
      arr.slice(1), 
      depth + 1, 
      true, 
      alpha, 
      beta, 
      p1Score, 
      p2Score + arr[0]
    );
    bestVal = Math.min(bestVal, leftVal);
    beta = Math.min(beta, bestVal);
    
    // Try taking from right end
    if (alpha < beta) { // Alpha-beta pruning
      let rightVal = minimax(
        arr.slice(0, arr.length - 1), 
        depth + 1, 
        true, 
        alpha, 
        beta, 
        p1Score, 
        p2Score + arr[arr.length - 1]
      );
      bestVal = Math.min(bestVal, rightVal);
      beta = Math.min(beta, bestVal);
    }
    
    return bestVal;
  }
}

// Function to find the best move for the current player
function findBestMove(arr, isPlayer1) {
  let bestVal = isPlayer1 ? -Infinity : Infinity;
  let bestMove = "";
  
  // Try taking from left end
  let leftVal = minimax(
    arr.slice(1), 
    0, 
    !isPlayer1, 
    -Infinity, 
    Infinity, 
    isPlayer1 ? arr[0] : 0, 
    isPlayer1 ? 0 : arr[0]
  );
  
  if ((isPlayer1 && leftVal > bestVal) || (!isPlayer1 && leftVal < bestVal)) {
    bestVal = leftVal;
    bestMove = "left";
  }
  
  // Try taking from right end
  let rightVal = minimax(
    arr.slice(0, arr.length - 1), 
    0, 
    !isPlayer1, 
    -Infinity, 
    Infinity, 
    isPlayer1 ? arr[arr.length - 1] : 0, 
    isPlayer1 ? 0 : arr[arr.length - 1]
  );
  
  if ((isPlayer1 && rightVal > bestVal) || (!isPlayer1 && rightVal < bestVal)) {
    bestVal = rightVal;
    bestMove = "right";
  }
  
  return { move: bestMove, value: bestVal };
}

// Function to simulate the game with optimal play
function simulateGame(arr) {
  let sequence = [...arr];
  let p1Score = 0;
  let p2Score = 0;
  let isPlayer1 = true;
  let gameStates = [];
  
  console.log("Starting sequence:", sequence);
  
  while (sequence.length > 0) {
    let bestMove = findBestMove(sequence, isPlayer1);
    let takenValue;
    
    if (bestMove.move === "left") {
      takenValue = sequence[0];
      sequence = sequence.slice(1);
    } else {
      takenValue = sequence[sequence.length - 1];
      sequence = sequence.slice(0, sequence.length - 1);
    }
    
    if (isPlayer1) {
      p1Score += takenValue;
    } else {
      p2Score += takenValue;
    }
    
    gameStates.push({
      player: isPlayer1 ? "Player 1" : "Player 2",
      move: bestMove.move,
      takenValue,
      remainingSequence: [...sequence],
      p1Score,
      p2Score
    });
    
    isPlayer1 = !isPlayer1;
  }
  
  console.log("\nGame simulation with optimal play:");
  gameStates.forEach((state, index) => {
    console.log(`Turn ${index + 1}: ${state.player} takes ${state.takenValue} from ${state.move}`);
    console.log(`  Remaining: [${state.remainingSequence}]`);
    console.log(`  Scores - P1: ${state.p1Score}, P2: ${state.p2Score}`);
  });
  
  console.log("\nFinal scores:");
  console.log(`Player 1: ${p1Score}`);
  console.log(`Player 2: ${p2Score}`);
  console.log(`Winner: ${p1Score > p2Score ? "Player 1" : p1Score < p2Score ? "Player 2" : "Tie"}`);
  
  return {
    winner: p1Score > p2Score ? "Player 1" : p1Score < p2Score ? "Player 2" : "Tie",
    p1Score,
    p2Score,
    gameStates
  };
}

// Analyze the sequence S1 = [1, 2, 7, 5]
const sequence = [1, 2, 7, 5];
const bestFirstMove = findBestMove(sequence, true);
console.log(`For sequence [${sequence}]:`);
console.log(`Player 1's best first move: Take ${bestFirstMove.move === "left" ? sequence[0] : sequence[sequence.length - 1]} from the ${bestFirstMove.move}`);
console.log(`Expected outcome value: ${bestFirstMove.value}`);
console.log(`Can Player 1 guarantee a win? ${bestFirstMove.value > 0 ? "Yes" : bestFirstMove.value < 0 ? "No" : "No, but can force a tie"}`);

// Simulate the full game
simulateGame(sequence);
