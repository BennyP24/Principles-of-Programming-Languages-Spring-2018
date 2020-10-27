import { CExp, Exp, PrimOp, Program, DefineExp } from "./L1-ast";
import { hasError, isAppExp, isBoolExp, isCExp, isDefineExp, isError, isNumExp, isPrimOp,
         isProgram, isVarRef, isVarDecl } from "./L1-ast";
import { parseL1 } from "./L1-ast";
import { first, isEmpty, rest } from "./L1-ast";
import * as assert from "assert";
import { filter, map, reduce } from "ramda";

// Implement the following function:
export const unparse = (x: Program | DefineExp | CExp) : string | Error => {
    var re = /,/gi;
    return isProgram(x) ? ('(L1 ' + map(unparse, x.exps) + ')').replace(re, "") : 
    isDefineExp(x) ? '(define' + unparse(x.var) + unparse(x.val) + ')' :     
    isBoolExp(x) ? (x.val ? ' #t' : ' #f') :
    isAppExp(x) ? ('(' + unparse(x.rator) + (map(unparse, x.rands)) + ')').replace(re, "") :
    isNumExp(x) ? ' '+x.val :
    isPrimOp(x) ? ' '+x.op :
    isVarDecl(x) ? ' '+x.var :
    isVarRef(x) ? ' '+x.var :
    x;
}