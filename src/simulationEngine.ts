import * as acorn from "acorn";
interface SimulationLog {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
  consoleOutput: string[];
}
export function simulateCode(code: string): SimulationLog {
  // TODO: Implement simulation engine
  const ast = acorn.parse(code, { ecmaVersion: 2020 });
  const simulation: SimulationLog = {
    callStack: [],
    microtasks: [],
    macrotasks: [],
    consoleOutput: [],
  };
  walk(ast, simulation);
  return simulation;
}
function walk(node: any, simulation: SimulationLog) {
  // TODO: Implement AST walker
  if (!node) return;

  if (node.type === "Program") {
    for (const stmt of node.body) {
      walk(stmt, simulation);
    }
  }
  if (node.type === "ExpressionStatement") {
    const expr = node.expression;

    //handle console.log
    if (
      expr.type === "CallExpression" &&
      expr.callee.type === "MemberExpression" &&
      expr.callee.object.name === "console" &&
      expr.callee.property.name === "log"
    ) {
      const logValue = expr.arguments[0]?.value ?? "<unknown>";
      simulation.callStack.push(logValue);
      simulation.consoleOutput.push(logValue);
    }
    //handle setTimeout
    if (
      expr.type === "CallExpression" &&
      expr.callee.type === "Identifier" &&
      expr.callee.name === "setTimeout"
    ) {
      simulation.macrotasks.push("setTimeout");
    }
    //handle Promise.resolve().then
    if (
      expr.type === "CallExpression" &&
      expr.callee.type === "MemberExpression" &&
      expr.callee.object.type === "CallExpression" &&
      expr.callee.object.callee.type === "MemberExpression" &&
      expr.callee.object.callee.object.name === "Promise" &&
      expr.callee.object.callee.property.name === "resolve" &&
      expr.callee.property.name === "then"
    ) {
      simulation.microtasks.push("promise.then");
    }
  }
}
