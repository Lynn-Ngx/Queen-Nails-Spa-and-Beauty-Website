angular.module('app.directives.typewriter', [])
    .directive('typewriter', function() {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl:  "/app/views/directives/typewriter/typewriter.template.html",
            controller: function($scope){

                const wordsToTypeWrite = [
                    'a manicure',
                    'a pedicure',
                    'some waxing'
                ]

                $scope.currentTypedWord = ''


                const delay = (time) => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve()
                        }, time)
                    })
                }

                const typeWriteWord = (word) => {
                    return new Promise(resolve => {
                        const lengthOfWord = word.length;
                        let currentIndexOnWord = 0
                        let incrementBy = 1

                        const typewriting = setInterval(async () => {
                            if (incrementBy === 1){
                                if (currentIndexOnWord < lengthOfWord){
                                    $scope.currentTypedWord += word[currentIndexOnWord]
                                    currentIndexOnWord += incrementBy;
                                }else {
                                    incrementBy = -1
                                    // await delay(1000)
                                }

                            }else {

                                if (currentIndexOnWord > 0){
                                    $scope.currentTypedWord = $scope.currentTypedWord.substring(0, $scope.currentTypedWord.length - 1)
                                    currentIndexOnWord += incrementBy;
                                }else {
                                    clearInterval(typewriting)
                                    resolve()
                                }
                            }

                            $scope.$apply();


                        }, 100)
                    })
                }

                let indexOfCurrentWordTypewriting = 0;



                const startTypescript = async() => {
                    while(true){
                        if (indexOfCurrentWordTypewriting === wordsToTypeWrite.length) {
                            indexOfCurrentWordTypewriting = 0
                        }

                        await typeWriteWord(wordsToTypeWrite[indexOfCurrentWordTypewriting])
                        indexOfCurrentWordTypewriting += 1
                    }
                }

                startTypescript()



            }
        }
    });