import { filter, map, reduce, zip } from "ramda";
import { first, isArray, isBoolean, isEmpty, isNumber, isString, rest, second, isLetStarExp, makeLetExp, makeLetStarExp, LetStarExp, LetExp, makeProgram, makeDefineExp, isVarDecl, makeBinding, isBinding, isAtomicExp, Binding, makePrimOp } from "./L3-ast";
import { AppExp, AtomicExp, BoolExp, CompoundExp, CExp, DefineExp, Exp, IfExp, LitExp, NumExp,
         Parsed, PrimOp, ProcExp, Program, StrExp, VarDecl, VarRef } from "./L3-ast";
import { allT, getErrorMessages, hasNoError, isError }  from "./L3-ast";
import { isAppExp, isBoolExp, isCExp, isDefineExp, isExp, isIfExp, isLetExp, isLitExp, isNumExp,
             isPrimOp, isProcExp, isProgram, isStrExp, isVarRef } from "./L3-ast";
import { makeAppExp, makeBoolExp, makeIfExp, makeLitExp, makeNumExp, makeProcExp, makeStrExp,
         makeVarDecl, makeVarRef } from "./L3-ast";
import { parseL3 } from "./L3-ast";
import { isClosure, isCompoundSExp, isEmptySExp, isSymbolSExp, isSExp,
         makeClosure, makeCompoundSExp, makeEmptySExp, makeSymbolSExp,
         Closure, CompoundSExp, SExp, Value } from "./value";

export const rewriteLetStar = (cexp: Parsed | Error) : LetExp  | Error => 
{
   return isError(cexp) ? cexp :
    isLetStarExp(cexp) ? rewriteLetStarEzer(cexp) :
    Error("Not a let* expression " + cexp);
}

export const rewriteLetStarEzer = (cexp: LetStarExp | LetExp) : LetExp =>
{
    if (cexp.bindings.length == 1){
        return makeLetExp(cexp.bindings, cexp.body);
    }else{
        const lastBinding = cexp.bindings[cexp.bindings.length-1];
        const reverseBinding = cexp.bindings.slice(0,cexp.bindings.length-1).reverse();
        const firstLet = makeLetExp([lastBinding], cexp.body);
        return reverseBinding.reduce((l: LetExp, bind: Binding): LetExp => makeLetExp([bind], [l]), firstLet);
    }
}

export const rewriteAllLetStar = (cexp: Parsed | Binding | Error) : Parsed | Binding | Error =>
{
    return isError(cexp) ? cexp :
    isBoolExp(cexp) ? cexp :
    isNumExp(cexp) ? cexp :
    isStrExp(cexp) ? cexp :
    isPrimOp(cexp) ? cexp :
    isVarRef(cexp) ? cexp :
    isVarDecl(cexp) ? cexp :
    isLitExp(cexp) ? cexp :
    isProgram(cexp) ? 
        makeProgram(map(rewriteAllLetStar,cexp.exps)) :
    isDefineExp(cexp) ? 
        makeDefineExp(cexp.var,<CExp>rewriteAllLetStar(cexp.val)) :
    isBinding(cexp) ? makeBinding(cexp.var, <CExp>rewriteAllLetStar(cexp.val)) :
    isIfExp(cexp) ? 
        (makeIfExp(
            <CExp>rewriteAllLetStar(cexp.test),
            <CExp>rewriteAllLetStar(cexp.then),
            <CExp>rewriteAllLetStar(cexp.alt))) :
    isAppExp(cexp) ? 
            makeAppExp(<CExp>rewriteAllLetStar(cexp.rator), map(rewriteAllLetStar,cexp.rands)) :
    isLetExp(cexp) ? makeLetExp(map(rewriteAllLetStar, cexp.bindings), map(rewriteAllLetStar, cexp.body)) :
    isProcExp(cexp) ? makeProcExp(cexp.args, map(rewriteAllLetStar,cexp.body)) :
    isLetStarExp(cexp) ? rewriteAllLetStar(rewriteLetStar(cexp)) :
    Error("Unexpected expression " + cexp);   
}
    
