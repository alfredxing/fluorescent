angular.module("fluorescent", [
    'fluorescent.controllers'
]).config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
]);