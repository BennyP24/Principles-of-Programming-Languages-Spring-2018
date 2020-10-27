#lang racket
(provide (all-defined-out))

;Signature: shift-left(ls)
;Type: [List(any)-> List(any)]
;Purpose: The function takes a list as an argument and evaluates the list that is it's shift-left by one place
(define shift-left
  (lambda (ls)
    (if (empty? ls)
        ls
        (if (empty? (cdr ls))
            ls
            (append (cdr ls) (cons (car ls) '()))
            )
        )
    )
  )

;Signature: shift-k-left(ls, k)
;Type: [List(any)xNumber-> List(any)]
;Purpose: The function takes a list and a number k as an arguments and evaluates the list that is it's shift-left k times
(define shift-k-left
  (lambda (ls k)
    (if (equal? k 0)
        ls
        (shift-k-left (shift-left ls) (- k 1))
        )
    )
  )

;Signature: shift-right(ls)
;Type: [List(any)-> List(any)]
;Purpose: The function takes a list as an argument and evaluates the list that is it's shift-right one time
(define shift-right
  (lambda (ls)
    (if (empty? ls)
        ls
        (if (empty? (cdr ls))
            ls
            (append (cons (last ls) '()) (take ls (- (length ls) 1)))
            )
        )
    )
  )

;Signature: combine(ls1, ls2)
;Type: [List(any)xList(any)-> List(any)]
;Purpose: The function takes two lists and combines them in alternating manner starting from the first list. if one of the lists is empty, then it returns the other list
(define combine
  (lambda (ls1 ls2)
    (if (not (empty? ls1))
        (if (not (empty? ls2))
            (cons (car ls1) (combine ls2 (cdr ls1)))
            ls1
            )
        ls2
        )
    )
  )
                                           
;Signature: sum-tree(tree)
;Type: [Tree(Number)-> Number)]
;Purpose: The function recieves a tree and returns the sum of all the values in the nodes of the tree
(define sum-tree
  (lambda (tree)
    (foldl + 0 (flatten tree))
    )
  )
    
;Signature: inverse-tree(tree)
;Type: [Tree(Number|Boolean)-> Tree(Number|Boolean)]
;Purpose: The function recieves a tree and returns equivalent one whose nose are as the following: if the node is of type Number than the equivalent node will be the negative of this node value. if the node is of type Boolean than the equivalent node is the logical not of that node value.
(define inverse-tree
  (lambda (tree)
    (if (empty? tree)
        '()
        (if (empty? (cdr tree))
            (if (number? (car tree))
                (cons (* -1 (car tree)) '())
                (cons (not (car tree)) '())
                )
            (if (number? (car tree))
                (cons (* -1 (car tree)) (map (lambda (rest) (inverse-tree rest)) (cdr tree)))
                (cons (not (car tree)) (map (lambda (rest) (inverse-tree rest)) (cdr tree)))
                )
            )
        )
    )
  )

        
