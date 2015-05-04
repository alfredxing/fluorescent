angular.module("fluorescent", [
    'fluorescent.controllers',
    'ng-context-menu'
]).config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
]);