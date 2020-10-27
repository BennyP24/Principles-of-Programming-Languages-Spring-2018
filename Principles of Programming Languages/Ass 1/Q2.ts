declare var require: any
const assert = require('assert');

//Q2.1 -----------------------------------------------------------------------------------------

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

const TreePreArray = function (tree: BinTree): number[]{
    let num_array = new Array<number>();
    if (tree == undefined) {
        return num_array
    }  else {
        num_array.push(tree.root)
        num_array = num_array.concat(TreePreArray(tree.left))
        num_array = num_array.concat(TreePreArray(tree.right))
    }
    return num_array
};

function testPreorder1(){
    // check if the preoreder operation on the given tree is as expected
    let bn1 : BinTree = {
        root: 1,
        left: { root: 2, left: {root:5} },
        right: { root: 3, left: {root: 10}, right: {root: 15, left:{root: 12}}}
    };
    let correct_array1: number[] = [1,2,5,3,10,15,12];
    assert.deepEqual(correct_array1, TreePreArray(bn1), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPreorder2(){
    // check if the preoreder operation on the given tree is as expected
    let bn2 : BinTree = {
        root: 2
    };
    let correct_array2: number[] = [2];
    assert.deepEqual(correct_array2, TreePreArray(bn2), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPreorder3(){
    // check if the preoreder operation on the given tree is as expected
    let bn3 : BinTree = {
        root: 1,
        left: {root: 2, left: {root: 3, left:{root: 4, left: {root: 5, left: {root: 6 }}}}}
    };
    let correct_array3: number[] = [1,2,3,4,5,6];
    assert.deepEqual(correct_array3, TreePreArray(bn3), "Doesn't match to the expected array");

    return "passed all tests";
}

const TreeInArray = function (tree: BinTree): number[]{
    let num_array = new Array<number>();
    if (tree == undefined) {
        return num_array
    } else {
        num_array = num_array.concat(TreeInArray(tree.left))
        num_array.push(tree.root)
        num_array = num_array.concat(TreeInArray(tree.right))
    }
    return num_array
};

function testInorder1(){
     // check if the preoreder operation on the given tree is as expected
     let bn1 : BinTree = {
        root: 1,
        left: { root: 2, left: {root:5} },
        right: { root: 3, left: {root: 10}, right: {root: 15, left:{root: 12}}}
    };
    let correct_array1: number[] = [5,2,1,10,3,12,15];
    assert.deepEqual(correct_array1, TreeInArray(bn1), "Doesn't match to the expected array");

    return "passed all tests";
}

function testInorder2(){
    // check if the preoreder operation on the given tree is as expected
       let bn2 : BinTree = {
        root: 2
    };
    let correct_array2: number[] = [2];
    assert.deepEqual(correct_array2, TreeInArray(bn2), "Doesn't match to the expected array");

   return "passed all tests";
}

function testInorder3(){
    // check if the preoreder operation on the given tree is as expected
    let bn3 : BinTree = {
        root: 1,
        left: {root: 2, left: {root: 3, left:{root: 4, left: {root: 5, left: {root: 6 }}}}}
    };
    let correct_array3: number[] = [6,5,4,3,2,1];
    assert.deepEqual(correct_array3, TreeInArray(bn3), "Doesn't match to the expected array");

   return "passed all tests";
}

const TreePostArray = function (tree: BinTree): number[]{
    let num_array = new Array<number>();
    if (tree == undefined) {
        return num_array
    } else {
        num_array = num_array.concat(TreePostArray(tree.left))
        num_array = num_array.concat(TreePostArray(tree.right))
        num_array.push(tree.root)
    }
    return num_array
};

function testPostorder1(){
     // check if the preoreder operation on the given tree is as expected
     let bn1 : BinTree = {
        root: 1,
        left: { root: 2, left: {root:5} },
        right: { root: 3, left: {root: 10}, right: {root: 15, left:{root: 12}}}
    };
    let correct_array1: number[] = [5,2,10,12,15,3,1];
    assert.deepEqual(correct_array1, TreePostArray(bn1), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPostorder2(){
    //  check if the preoreder operation on the given tree is as expected
    let bn2 : BinTree = {
        root: 2
    };
    let correct_array2: number[] = [2];
    assert.deepEqual(correct_array2, TreePostArray(bn2), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPostorder3(){
    // check if the preoreder operation on the given tree is as expected
    let bn3 : BinTree = {
    root: 1,
        left: {root: 2, left: {root: 3, left:{root: 4, left: {root: 5, left: {root: 6 }}}}}
    };
    let correct_array3: number[] = [6,5,4,3,2,1];
    assert.deepEqual(correct_array3, TreePostArray(bn3), "Doesn't match to the expected array");

    return "passed all tests";
}

interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

const GBinTreePreArray = function<T> (GBtree: GBinTree<T>): T[]{
    let array = new Array<T>();
    if (GBtree == undefined) {
        return array
    }else {
        array.push(GBtree.root)
        array = array.concat(GBinTreePreArray<T>(GBtree.left))
        array = array.concat(GBinTreePreArray<T>(GBtree.right))
    }
    return array
};

function testPreorderGBT1(){
    // check if the preoreder operation on the given tree is as expected
    let gbn1 : GBinTree<string> = {
        root: "a",
        left: { root: "b", left: {root:"c"} },
        right: { root: "d", left: {root: "e"}, right: {root: "f", left: {root: "g"}, right:{root: "h"}}}
    }
    let correct_array1: string[] = ["a","b","c","d","e","f","g","h"];
    assert.deepEqual(correct_array1, GBinTreePreArray(gbn1), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPreorderGBT2(){
    // check if the preoreder operation on the given tree is as expected
    let gbn2 : GBinTree<boolean> = {
        root: true
    };
    let correct_array2: boolean[] = [true];
    assert.deepEqual(correct_array2, GBinTreePreArray(gbn2), "Doesn't match to the expected array");

    return "passed all tests";
}

function testPreorderGBT3(){
    // check if the preoreder operation on the given tree is as expected
    let gbn3 : GBinTree<any> = {
        root: 1,
        left: {root: "aa", left: {root: true, left:{root: 4, left: {root: "bb", left: {root: 6 }}}}}
    };
    let correct_array3: any[] = [1,"aa",true,4,"bb",6];
    assert.deepEqual(correct_array3, GBinTreePreArray(gbn3), "Doesn't match to the expected array");

    return "passed all tests";
}

const GBinTreeInArray = function<T> (GBtree: GBinTree<T>): T[]{
    let array = new Array<T>();
    if (GBtree == undefined) {
        return array
    } else {
        array = array.concat(GBinTreeInArray<T>(GBtree.left))
        array.push(GBtree.root)
        array = array.concat(GBinTreeInArray<T>(GBtree.right))
    }
    return array
};

function testInorderGBT1(){
    // check if the preoreder operation on the given tree is as expected
    let gbn1 : GBinTree<string> = {
        root: "a",
        left: { root: "b", left: {root:"c"} },
        right: { root: "d", left: {root: "e"}, right: {root: "f", left: {root: "g"}, right:{root: "h"}}}
    }
    let correct_array1: string[] = ["c","b","a","e","d","g","f","h"];
    assert.deepEqual(correct_array1, GBinTreeInArray(gbn1), "Doesn't match to the expected array");

    return "passed all tests";
}

function testInorderGBT2(){
    // check if the preoreder operation on the given tree is as expected
    let gbn2 : GBinTree<boolean> = {
        root: true
    };
    let correct_array2: boolean[] = [true];
    assert.deepEqual(correct_array2, GBinTreeInArray(gbn2), "Doesn't match to the expected array");

    return "passed all tests";
}

function testInorderGBT3(){
    // check if the preoreder operation on the given tree is as expected
    let gbn3 : GBinTree<any> = {
        root: 1,
        left: {root: "aa", left: {root: true, left:{root: 4, left: {root: "bb", left: {root: 6 }}}}}
    };
    let correct_array3: any[] = [6,"bb",4,true,"aa",1];
    assert.deepEqual(correct_array3, GBinTreeInArray(gbn3), "Doesn't match to the expected array");

    return "passed all tests";
}

const GBinTreePostArray = function<T> (GBtree: GBinTree<T>): T[]{
    let array = new Array<T>();
    if (GBtree == undefined) {
        return array
    } else {
        array = array.concat(GBinTreePostArray<T>(GBtree.left))
        array = array.concat(GBinTreePostArray<T>(GBtree.right))
        array.push(GBtree.root)
    }
    return array
};

function testPostorderGBT1(){
    // check if the preoreder operation on the given tree is as expected
    let gbn1 : GBinTree<string> = {
        root: "a",
        left: { root: "b", left: {root:"c"} },
        right: { root: "d", left: {root: "e"}, right: {root: "f", left: {root: "g"}, right:{root: "h"}}}
    }
    let correct_array1: any[] = ["c","b","e","g","h","f","d","a"];
    assert.deepEqual(correct_array1, GBinTreePostArray(gbn1), "Doesn't match to the expected array");
    return "passed all tests";
}

function testPostorderGBT2(){
    // check if the preoreder operation on the given tree is as expected
    let gbn2 : GBinTree<boolean> = {
        root: true
    };
    let correct_array2: any[] = [true];
    assert.deepEqual(correct_array2, GBinTreePostArray(gbn2), "Doesn't match to the expected array");
    return "passed all tests";
}

function testPostorderGBT3(){
    // check if the preoreder operation on the given tree is as expected
    let gbn3 : GBinTree<any> = {
        root: 1,
        left: {root: "aa", left: {root: true, left:{root: 4, left: {root: "bb", left: {root: 6 }}}}}
    };
    let correct_array3: any[] = [6,"bb",4,true,"aa",1];
    assert.deepEqual(correct_array3, GBinTreePostArray(gbn3), "Doesn't match to the expected array");
    return "passed all tests";
}

//Q2.2 -------------------------------------------------------------------------------------------------

const KSubsets = function<T> (A: T[], k: number): Array<Array<T>>{
    let result_array = Array<Array<T>>()
    let B = Array<boolean>(A.length).fill(false)
    result_array = KSubsetsEzer(result_array, A, B, 0, 0, k)
    return result_array;
};

const KSubsetsEzer = function<T> (result: Array<Array<T>>,A: T[], B: boolean[], startIndex: number, currentSize: number, k: number): Array<Array<T>>{
    if(currentSize === k){
        let HelpArray = Array<T>()
        for(var i = 0; i < A.length; i++){
            if(B[i])
                HelpArray.push(A[i])
        }
        result.push(HelpArray)   
        return result; 
    }
    if(startIndex === A.length){
        return result;
    }
    B[startIndex] = true;
    result = KSubsetsEzer(result, A, B, startIndex+1, currentSize+1, k)

    B[startIndex] = false;
    result = KSubsetsEzer(result, A, B, startIndex+1, currentSize, k)

    return result;
};

function KSubsetsTest1(){
    //check if the function gives the right subsets of the Array
    let arr: number[] = [1,2,3,4,5];
    let correct_array1: number[][] = [[1,2,3,4],[1,2,3,5],[1,2,4,5],[1,3,4,5],[2,3,4,5]];
    assert.deepEqual(correct_array1, KSubsets(arr,4), "Doesn't match to the expected array");

    return "Passed all tests";
}

function KSubsetsTest2(){
    //check if the function gives the right subsets of the Array
    let arr: number[] = [1,2,3,4,5];
    let correct_array2: number[][] = [[1],[2],[3],[4],[5]];
    assert.deepEqual(correct_array2, KSubsets(arr,1), "Doesn't match to the expected array");

    return "Passed all tests";
}

function KSubsetsTest3(){
    //check if the function gives the right subsets of the Array
    let arr: number[] = [1,2,3,4,5];
    let correct_array3: number[][] = [[1,2,3,4,5]];
    assert.deepEqual(correct_array3, KSubsets(arr,5), "Doesn't match to the expected array");

    return "Passed all tests";
}

const AllSubsets = function<T> (A: T[]): Array<Array<T>>{
    let result_array = Array<Array<T>>()
    for(var i = 0; i < A.length+1; i++){
        result_array = result_array.concat(KSubsets(A,i))
    }
    return result_array;
};

function AllSubsetsTest1(){
    //check if the function gives the right subsets of the Array
    let arr1: number[] = [1,2,3];
    let correct_array1: number[][] = [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]];
    assert.deepEqual(correct_array1, AllSubsets(arr1), "Doesn't match to the expected array");

    return "Passed all tests";
}

function AllSubsetsTest2(){
    //check if the function gives the right subsets of the Array
    let arr2: number[] = [];
    let correct_array2: number[][] = [[]];
    assert.deepEqual(correct_array2, AllSubsets(arr2), "Doesn't match to the expected array");

    return "Passed all tests";
}

function AllSubsetsTest3(){
    //check if the function gives the right subsets of the Array
    let arr3: number[] = [1,2];
    let correct_array3: number[][] = [[],[1],[2],[1,2]];
    assert.deepEqual(correct_array3, AllSubsets(arr3), "Doesn't match to the expected array");

    return "Passed all tests";
}

//Q2.3 --------------------------------------------------------------------------------------------------

const flatmap = function<T,R>(f:(x: T)=> R[], A: T[]): R[]{
    return [].concat.apply([],A.map(f));
};

function flatmapTest1(){
    //check if the function gives the right subsets of the Array
    let arr1: number[][] = [[1],[2],[3],[4],[5]];
    let correct_array1: number[] = [2,3,4,5,6];
    assert.deepEqual(correct_array1, flatmap((x)=> [x[0]+1], arr1), "Doesn't match to the expected array");
    
    return "Passed all tests";
}

function flatmapTest2(){
    //check if the function gives the right subsets of the Array
    let arr2: number[][] = [[2,1],[3,4],[6,5],[7,8]];
    let correct_array2: boolean[] = [true,false,true,false];
    assert.deepEqual(correct_array2, flatmap((x)=> [x[0]%2==0], arr2), "Doesn't match to the expected array");
    
    return "Passed all tests";
}

function flatmapTest3(){
    //check if the function gives the right subsets of the Array
    let arr3: number[] = [1,2,3,10];
    let correct_array3: number[] = [1,4,9,100];
    assert.deepEqual(correct_array3, flatmap((x)=>[x*x],arr3),"Doesn't match to the expected array");
    
    return "Passed all tests";
}

interface Boxart{
    width: number;
    height: number;
    url: string;
}

interface Boomark{
    id: number;
    time: number;
}

interface Video {
    "id": number;
    "title": string;
    "boxarts": Boxart[];
    "url": string;
    "rating": number;
    "bookmark": Boomark[];
}

interface Movies{
    name: string;
    videos: Video[];
}

interface VideoResult {
    "id": number;
    "title": string;
    "boxart": string;
}

const getBoxarts = function(movies: Movies[]): VideoResult[]{
    return (flatmap((x)=>x.videos,movies)).map(x=> {return {id : x.id, title : x.title, boxart : (x.boxarts.filter((x) =>  x.height == 200 && x.width == 150).map(x => {return x.url})).reduce((x,curr)=>x+curr,"")}})
};

function getBoxartsTest1(){
    let movieLists1 = [
        {
            name: "Instant Queue",
            videos : [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }
    
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ]
    let result = [ { id: 70111470,
        title: 'Die Hard',
        boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
      { id: 654356453,
        title: 'Bad Boys',
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
      { id: 65432445,
        title: 'The Chamber',
        boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
      { id: 675465,
        title: 'Fracture',
        boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } 
    ]
    assert.deepEqual(result, getBoxarts(movieLists1), "Doesn't match to the expected array");
    return "passed all tests";
}

function getBoxartsTest2(){
    let movieLists2 = [
        {
            name: "Instant Queue",
            videos : [
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }
    
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ]
    let result = [ 
      { id: 654356453,
        title: 'Bad Boys',
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
      { id: 65432445,
        title: 'The Chamber',
        boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
      { id: 675465,
        title: 'Fracture',
        boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } 
    ]
    assert.deepEqual(result, getBoxarts(movieLists2), "Doesn't match to the expected array");
    return "passed all tests";
}

function getBoxartsTest3(){
    let movieLists2 = [
        {
            name: "Instant Queue",
            videos : [
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ]
    let result = [{ id: 654356453,
        title: 'Bad Boys',
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' }]
    assert.deepEqual(result, getBoxarts(movieLists2), "Doesn't match to the expected array");
    return "passed all tests";
}