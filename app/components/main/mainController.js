angular.module("fluorescent.controllers", []).controller("mainController", function($scope) {
    $scope.colorDistr = [["rgba(7,198,240,0.8)", 0.3],["rgba(242,197,10,0.8)", 0.55],["rgba(0,220,63,0.8)", 0.15]];
    $scope.colorBarGradient = generateColorBar.apply(null, $scope.colorDistr);

    $scope.groupings = [
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(0,220,63,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(0,220,63,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(0,220,63,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(0,220,63,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                }
            ]
        },
        {
            "urlLabel": "www.google.com",
            "faviconPath": "assets/images/icon.svg",
            "resultCount": 3,
            "annotations": [
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                }
            ]
        }
    ];
});
