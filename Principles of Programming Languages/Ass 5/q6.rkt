#lang racket
(require racket/sandbox)
(require racket/exn)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Part 1: The lazy lists interface ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define cons-lzl cons)

(define empty-lzl empty)

(define empty-lzl? empty?)

(define head car)

(define tail
  (lambda (lz-lst)
    ((cdr lz-lst))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Part 2: Auxiliary functions for testing ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; Signature: check-inf-loop(mission)
; Purpose: check if the result is infinite loop,
;          if so, return 'infinite
;          otherwise the actual result
; Type: [[Empty -> T1] -> Union(T1, Symbol)]
(define check-inf-loop
  (lambda (mission)
    (with-handlers ([exn:fail:resource?
                     (lambda (e)
                       (if (equal? (exn->string e)
                                   "with-limit: out of time\n")
                           'infinite
                           'error))])
      (call-with-limits 1 #f mission))))

; A function that creates an infinite loop
(define (inf x) (inf x))

;;;;;;;;;;;;;;;;;;;;;;;;;;
; Part 3: The assignment ;
;;;;;;;;;;;;;;;;;;;;;;;;;;

; Signature: all-subs(long)
; Type: [List(T) -> LZL(List(T))]
; Purpose: compute all lists that can be obtained 
; from long by removing items from it.
; Pre-conditions: -
; Tests:
; (take (all-subs '(1 2 3)) 8) ->
; '(() (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))
(define all-subs
  (lambda (long)
  (if (empty? long)
      (cons-lzl long (lambda () empty-lzl))
      (let ((rest (all-subs (cdr long))))
        (lzl-append rest (lzl-map (lambda (x)
                            (cons (car long) x))
                          rest))))))

;; Signature: take(lz-lst,n)
;; Type: [LzL*Number -> List]
;; If n > length(lz-lst) then the result is lz-lst as a List
(define take
  (lambda (lz-lst n)
    (if (or (= n 0) (empty-lzl? lz-lst))
      empty-lzl
      (cons (head lz-lst)
            (take (tail lz-lst) (- n 1))))))

;; Signature: lz-lst-append(lz1, lz2)
;; Type: [Lzl(T) * Lzl(T) -> Lzl(T)]
(define lzl-append
  (lambda (lz1 lz2)
    (if (empty-lzl? lz1)
        lz2
        (cons-lzl (head lz1)
                  (lambda () (lzl-append (tail lz1) lz2))))))

;; Signature: lzl-map(f, lz)
;; Type: [[T1 -> T2] * Lzl(T1) -> Lzl(T2)]
(define lzl-map
  (lambda (f lzl)
    (if (empty-lzl? lzl)
        lzl
        (cons-lzl (f (head lzl))
                  (lambda () (lzl-map f (tail lzl)))))))


;;;;;;;;;;;;;;;;;;;;;
; Part 4: The tests ;
;;;;;;;;;;;;;;;;;;;;;

;; Make sure to add take or another utility to test here
;; If the results are obained in a different order, change the test accordingly.
(check-inf-loop (lambda () (take (all-subs '(1 2 3)) 8)))
(check-inf-loop (lambda () (take (all-subs '(1 2 3)) 30)))
(check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 30)))
(check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 7)))
(check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 10)))
(check-inf-loop (lambda () (take (all-subs '(1 2 3 4 5 )) 20)))
;; Write more tests - at least 5 tests.

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Part 5: The tests expected results;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

#|
> (check-inf-loop (lambda () (take (all-subs '(1 2 3)) 8))
'(() (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))
> (check-inf-loop (lambda () (take (all-subs '(1 2 3)) 30))
'(() (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))
> (check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 30))
'(() (4) (3) (3 4) (2) (2 4) (2 3) (2 3 4) (1) (1 4) (1 3) (1 3 4) (1 2) (1 2 4) (1 2 3) (1 2 3 4))
>(check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 7)))
'(() (4) (3) (3 4) (2) (2 4) (2 3))
>(check-inf-loop (lambda () (take (all-subs '(1 2 3 4)) 10)))
'(() (4) (3) (3 4) (2) (2 4) (2 3) (2 3 4) (1) (1 4))
>(check-inf-loop (lambda () (take (all-subs '(1 2 3 4 5 )) 20)))
'(() (5) (4) (4 5) (3) (3 5) (3 4) (3 4 5) (2) (2 5) (2 4) (2 4 5) (2 3) (2 3 5) (2 3 4) (2 3 4 5) (1) (1 5) (1 4) (1 4 5))
|#