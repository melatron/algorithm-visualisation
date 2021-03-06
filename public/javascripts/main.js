/**
 * Created by MelatroN on 09/01/2016.
 */
var alg;

$(function () {
    'use strict';
    /* jshint ignore:start */
    class ArrayVisual {
        constructor(arr) {
            this.array = arr;
            this._canvasWidth = 600;
            this.Canvas = $('#canvas');
            this.Stage = new createjs.Stage(this.Canvas[0]);
        }

        set array(value) {
            if (Array.isArray(value)) {
                this._array = value;
            }
        }

        get array() {
            return this._array.slice();
        }

        getRectangle(op) {
            var re = new createjs.Graphics()
                .beginFill("rgba(0, 0, 0, 1)")
                .drawRect(op.x, op.y, op.width, op.height);

            return new createjs.Shape(re);
        }

        getBoxWithSymbol(symbol) {
            var length = this.array.length;
            var size = this.getSize();
            var currentBox = new createjs.Container();

            var currentRect = this.getRectangle({
                x: 0,
                y: 0,
                width: size,
                height: size
            });

            var currentNumber = new createjs.Text('' + symbol, size / 2 + 'px Arial', '#ffffff');
            var textBounds = currentNumber.getTransformedBounds();
            currentNumber.x = size / 2 - (textBounds.width / 2);
            currentNumber.y = size / 2 - (textBounds.height / 2);

            currentBox.addChild(currentRect);
            currentBox.addChild(currentNumber);

            return currentBox;
        }

        getSize() {
            var length = this.array.length;
            var size = Math.round((this._canvasWidth - length - 40) / length);

            return size;
        }

        getCanvasArray() {
            var totalSize = 0;
            var result = new createjs.Container();
            var currentBox;
            var length = this.array.length;
            var size = this.getSize();

            for (var i = 0; i < length; i++) {
                currentBox = this.getBoxWithSymbol(this.array[i]).set({
                    x: totalSize,
                    y: 0
                });

                currentBox.oldX = totalSize;

                result.addChild(currentBox);

                totalSize += (size + Math.round(20 / length));
            }

            this._canvasArray = result;

            return result;
        }

        moveTo(container, x, y, callback) {
            var flag = container.y < 10;
            var bounds = container.getTransformedBounds();

            if (flag) {
                createjs.Tween.get(container)
                    .to({
                        x: container.x,
                        y: container.y + bounds.height + 2
                    }, 200)
                    .to({
                        x: x,
                        y: y
                    }, 500)
                    .call(callback);
            } else {
                createjs.Tween.get(container)
                    .to({
                        x: x,
                        y: y
                    }, 500)
                    .call(callback);
            }
        }

        compare(action, callback) {
            var first = this._canvasArray.getChildAt(action.from);
            var second = this._canvasArray.getChildAt(action.to);
            var size = this.getSize();
            var self = this;
            var symbol = action.result === 0 ?
                '==' :
                action.result === 1 ?
                    '>' :
                    '<';
            var i = 0;
            var operator = this.getBoxWithSymbol(symbol).set({
                x: 250,
                y: size + 50
            });

            var toDo = function () {
                i++;
                if (i === 2) {
                    self._canvasArray.removeChild(operator);
                    callback();
                }
            };

            this._canvasArray.addChild(operator);

            this.moveTo(first, 250 - size - 20, size + 50, toDo);

            this.moveTo(second, 250 + size + 20, size + 50, toDo);
        }

        swapInArr(first, second) {
            let temp = this._array[first];
            this._array[first] = this._array[second];
            this._array[second] = temp;

            let temp2 = this._canvasArray.swapChildrenAt(first, second);
        }

        swap(action, callback) {
            var self = this;
            var first = this._canvasArray.getChildAt(action.from);
            var second = this._canvasArray.getChildAt(action.to);
            var i = 0;

            var toDo = function () {
                i++;
                if (i === 2) {
                    callback();
                }
            };

            this.moveTo(first, second.oldX, 0, toDo);
            this.moveTo(second, first.oldX, 0, toDo);

            this.swapInArr(action.from, action.to);

            var temp = first.oldX;
            first.oldX = second.oldX;
            second.oldX = temp;
        }

        noSwap(action, callback) {
            var self = this;
            var first = this._canvasArray.getChildAt(action.from);
            var second = this._canvasArray.getChildAt(action.to);
            var i = 0;

            var toDo = function () {
                i++;
                if (i === 2) {
                    callback();
                }
            };

            this.moveTo(first, first.oldX, 0, toDo);

            this.moveTo(second, second.oldX, 0, toDo);
        }
    }

    var Canvas = $('#canvas');
    var Stage = new createjs.Stage(Canvas[0]);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", Stage);

    var value;
    var array;
    var visualArray;


    $('.clear-stage').off('click').on('click', function(){
        alg.play = false;
        Stage.removeAllChildren();
    });

    $('.algorithm').off('click').on('click', function (e) {
        value = $('#array').val();

        Stage.removeAllChildren();

        array = JSON.parse(value);
        visualArray = new ArrayVisual(array);

        alg.play = false;

        var route = $(this).data('alg');

        $.ajax(
            {
                url: 'algorithm/' + route,
                type: "POST",
                crossDomain: true,
                //contentType: "application/json; charset=utf-8",
                data: {
                    array: array
                },
                success: function (data, textStatus, jqXHR) {
                    alg.placeArray(array);
                    alg.startLoop(data.actions);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('it didnt work');
                }
            });
    });

    $("#button-login").off('click').on('click', function (e) {
        var $this = $(this);
        var email = $('#exampleInputEmail1').val();
        var password = $('#exampleInputPassword').val();
        var name = $('#exampleInputName').val();
        var postData = {
            username: email,
            firstname: name,
            password: password
        };

        $.ajax({
            url: 'login',
            type: "POST",
            crossDomain: true,
            data: postData,
            success: function (data, textStatus, jqXHR) {
                toastr.success( 'Success login!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.success( 'Failed loging in!');
            }
        });
    });

    $("#button-register").off('click').on('click', function (e) {
        var $this = $(this);
        var email = $('#exampleInputEmail1').val();
        var password = $('#exampleInputPassword').val();
        var name = $('#exampleInputName').val();
        var postData = {
            username: email,
            firstname: name,
            password: password
        };

        $.ajax({
            url: 'register',
            type: "POST",
            crossDomain: true,
            data: postData,
            success: function (data, textStatus, jqXHR) {
                toastr.success( 'Success registering!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //if fails
                toastr.success( 'Failed registering!');
            }
        });
    });

    $('.post-comment').off('click').on('click', function(){
        var text = $('.text-comment').val();
       alg.postComment(text);
    });

    alg = {
        play: true,
        placeArray: function (arr) {
            visualArray.array = arr;

            this.play = true;

            var container = visualArray.getCanvasArray();

            Stage.removeAllChildren();

            container.x = 20;
            container.y = 20;
            Stage.addChild(container);
        },
        compare: function (action) {
            action = {
                action: 'compare',
                from: 2,
                to: 3,
                result: -1
            };

            visualArray.compare(action, function () {
            });
        },
        getVis: function () {
            return visualArray;
        },
        fireAction(data, callback) {

            visualArray[data.action](data, callback);
        },
        startLoop(arr) {
            var self = this;

            this.syncLoop(arr.length, function (loop) {
                var index = loop.iteration();

                self.fireAction(arr[index], function () {
                    if(alg.play) {
                        loop.next();
                    } else {
                        loop.stopLoop()
                    }
                });
            }, function () {

            });
        },
        syncLoop: function (iterations, process, exit) {
            var index = 0,
                done = false,
                shouldExit = false;
            var loop = {
                next: function () {
                    if (done) {
                        if (shouldExit && exit) {
                            return exit(); // Exit if we're done
                        }
                    }
                    // If we're not finished
                    if (index < iterations) {
                        index++; // Increment our index
                        process(loop); // Run our process, pass in the loop
                        // Otherwise we're done
                    } else {
                        done = true; // Make sure we say we're done
                        if (exit) exit(); // Call the callback on exit
                    }
                },
                iteration: function () {
                    return index - 1; // Return the loop number we're on
                },
                stopLoop: function (end) {
                    done = true; // End the loop
                    shouldExit = end; // Passing end as true means we still call the exit callback
                }
            };
            loop.next();
            return loop;
        },

        fireAfterAsyncLoopFinished: function (asyncFunctions, callback) {
            var index = 0;
            asyncFunctions.forEach(function (func) {
                func(function () {
                    index++;
                    if (index === asyncFunctions.length)
                        callback();
                });
            });
        },

        getArticle: function (options) {
            $.ajax({
                url: 'blog/getArticle',
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    articleId: "56bcfe4ba888a2101b0d94d2"
                },
                success: function (data, textStatus, jqXHR) {
                    data.article.comments.forEach(function(c){
                        $('.comment-section').append(templates.comment(c));
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        },
        postComment: function (text) {
            $.ajax({
                url: 'blog/postComment',
                type: "POST",
                crossDomain: true,
                data: {
                    articleId: '56bcfe4ba888a2101b0d94d2',
                    content: text
                },
                success: function (data) {
                    toastr.success( 'Your comment is posted!');

                    $('.comment-section').append(templates.comment(data.comment));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.success( 'Couldnt post your comment!');
                }
            });
        },
        placeComment: function() {

        }
    };

    alg.getArticle();
    /* jshint ignore:end */
});