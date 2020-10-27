#lang racket

(define vowels '(a e i o u))

;Signature: count-syllables(list)
;Type: [List(char)-> Number]
;Purpose: The function take a lsit of letters as argument and returns the number of syllables in the word formed by letters. group of consecutive vowels counts as one.
(define count-syllables
  (lambda (list)
    (if (empty? list)
        0
        (count-syllables-ezer list #f 0)
        )
    )
  )

;Signature: count-syllables-ezer(list, last_char, counter)
;Type: [List(char)xBooleanxNumber -> Number]
;Purpose: The function take a lsit of letters as argument and returns the number of syllables in the word formed by letters. group of consecutive vowels counts as one.
(define count-syllables-ezer
  (lambda (list last_char counter)
          (if (empty? list)
              counter
              (if (not (is_member (car list) vowels))
                  (count-syllables-ezer (cdr list) #f counter)
                  (if (equal? last_char #t)
                      (count-syllables-ezer (cdr list) #t counter)
                      (count-syllables-ezer (cdr list) #t (+ counter 1))
                      )
                  )
              )
          )
  )

;Signature: member(element, list)
;Type: [charxList(char) -> Boolean]
;Purpose: The function returns true if the list contains the element. Otherwise, returns false.
(define is_member
  (lambda (element list)
    (if (empty? list)
        #f
        (if (equal? element (car list))
            #t
            (is_member element (cdr list))
            )
        )
    )
  )


;Signature: count-syllables-test1()
;Type: [ None -> Boolean]
;Purpose: test the function count-syllables
(define count-syllables-test1
  (if (equal? (count-syllables '(a a a a a)) 1)
      #t
      #f
      )
  )

;Signature: count-syllables-test2()
;Type: [ None -> Boolean]
;Purpose: test the function count-syllables
(define count-syllables-test2
  (if (equal? (count-syllables '(a b a b a b a b a)) 5)
      #t
      #f
      )
  )

;Signature: count-syllables-test3()
;Type: [ None -> Boolean]
;Purpose: test the function count-syllables
(define count-syllables-test3
  (if (equal? (count-syllables '(b c d e e e)) 1)
      #t
      #f
      )
  )

;Signature: count-syllables-test4()
;Type: [ None -> Boolean]
;Purpose: test the function count-syllables
(define count-syllables-test4
  (if (equal? (count-syllables '(a a b e i c w i o e d e)) 4)
      #t
      #f
      )
  )

;Signature: count-syllables-test5()
;Type: [ None -> Boolean]
;Purpose: test the function count-syllables
(define count-syllables-test5
  (if (equal? (count-syllables '(a a e c e e a p p e o a d o n l p)) 4)
      #t
      #f
      )
  )

;Signature: sorted?(list, procedure)
;Type: [List(Number)xprocedure-> Boolean]
;Purpose: The function returns true if the list is sorted according to the comparator argument
;in case which the list is empty so the procedure applies in manner of default to any procedure given as argument. Also, in case which there is a list with
;only one element, there is other elements to compare it to, this case also applies in manner of default to any procedure given as argument.
(define sorted?
  (lambda (list proc)
    (if (empty? list)
        #t
        (if (empty? (cdr list))
            #t
            (check_if_sorted list proc)
            )
        )
    )
  )

;Signature: check_if_sorted(list, procedure)
;Type: [List(Number)xprocedure-> Boolean]
;Purpose: The function returns true if the list is sorted according to the comparator argument
(define check_if_sorted
  (lambda (list proc)
    (if (empty? (cdr list))
        #t
        (if (not (proc (car list) (car (cdr list))))
            #f
            (check_if_sorted (cdr list) proc)
            )
        )
    )
  )

;Signature: merge(list1, list2)
;Type: [List(Number)xList(Number)-> List(Number)]
;Purpose: The function returns a list in increasing order which combined from 2 increasing order lists given as arguments. Those 2 lists must be in increasing order. Otherwise, error should be thrown.
(define merge
  (lambda (list1 list2)
    (if(= (check_preconditions list1) 1)
       (error "preconditions of the first list don't match")
       (if (= (check_preconditions list2) 1)
           (error "preconditions of the second list don't match")
           (operate_merge list1 list2))
       )
    )
  )

;Signature: check_preconditions(list)
;Type: List(Number)-> None]
;Purpose: The functions checks if the list given as argument is actually a list and if it contains numbers in increasing order. Return 1, if the preconditions don't match. Else return 0.
(define check_preconditions
  (lambda (list)
    (if (not (list? list))
        1
        (if (not (andmap integer? list))
            1
            (if (not (sorted? list <))
                1
                0
                )
            )
        )
    )
  )

;Signature: operate_merge(list1, list2, result_list)
;Type: [List(Number)xList(Number)-> List(Number)]
;Purpose: The function returns a list in increasing order which combined from 2 increasing order lists given as arguments. Those 2 lists must be in increasing order. Otherwise, error should be thrown.
(define operate_merge
  (lambda (list1 list2)
    (if (not (empty? list1))
       (if (not (empty? list2))
           (if (< (car list1) (car list2))
               (cons (car list1) (operate_merge (cdr list1) list2))
               (if (> (car list1) (car list2))
                   (cons (car list2) (operate_merge list1 (cdr list2)))
                   (cons (car list2) (operate_merge (cdr list1) (cdr list2)))
                   )
               )
           (cons (car list1) (operate_merge (cdr list1) list2))
           )
       (if (empty? list2)
           '()
           (cons (car list2) (operate_merge list1 (cdr list2)))
           )
       )
    )
  )

;Signature: merge-test1()
;Type: [ None -> Boolean]
;Purpose: test the function merge
(define merge-test1
  (if (equal? (merge '(1 2 9) '(2 3 10)) '(1 2 3 9 10))
      #t
      #f
      )
  )

;Signature: merge-test2()
;Type: [ None -> Boolean]
;Purpose: test the function merge
(define merge-test2
  (if (equal? (merge '(1 2 9) '(1 2 9)) '(1 2 9))
      #t
      #f
      )
  )

;Signature: merge-test3()
;Type: [ None -> Boolean]
;Purpose: test the function merge
(define merge-test3
  (if (equal? (merge '(3 9 13 22) '(4 8 33 50)) '(3 4 8 9 13 22 33 50))
      #t
      #f
      )
  )

;Signature: remove-adjacent-duplicates(list)
;Type: [List(T)-> List(T)]
;Purpose: The function returns the same list given as argument  with any sequence of repeated elements reduced to a single element. 
(define remove-adjacent-duplicates
  (lambda (list)
    (if (empty? list)
        list
        (remove-adjacent-duplicates-ezer (car list) (cdr list))
        )
    )
  )

;Signature: remove-adjacent-duplicates-ezer(last_element, list)
;Type: [TxList(T)-> List(T)]
;Purpose: The function returns the same list given as argument  with any sequence of repeated elements reduced to a single element. 
(define remove-adjacent-duplicates-ezer
  (lambda (last_element list)
    (if (empty? list)
        (cons last_element '())
        (if (equal? last_element (car list))
            (remove-adjacent-duplicates-ezer last_element (cdr list))
            (cons last_element (remove-adjacent-duplicates-ezer (car list) (cdr list)))
         )
        )
    )
  )

;Signature: remove-adjacent-duplicates-test1()
;Type: [ None -> Boolean]
;Purpose: test the function remove-adjacent-duplicates
(define remove-adjacent-duplicates-test1
  (if (equal? (remove-adjacent-duplicates '(a a a a a a a a a)) '(a))
      #t
      #f
      )
  )

;Signature: remove-adjacent-duplicates-test2()
;Type: [ None -> Boolean]
;Purpose: test the function remove-adjacent-duplicates
(define remove-adjacent-duplicates-test2
  (if (equal? (remove-adjacent-duplicates '(a b b a d e f f f t r a a c c c)) '(a b a d e f t r a c))
      #t
      #f
      )
  )

;Signature: remove-adjacent-duplicates-test3()
;Type: [ None -> Boolean]
;Purpose: test the function remove-adjacent-duplicates
(define remove-adjacent-duplicates-test3
  (if (equal? (remove-adjacent-duplicates '(1 1 1 1 3 4 2 1 2 2 2 4 4 5)) '(1 3 4 2 1 2 4 5))
      #t
      #f
      )
  ) 


            


       
        

              