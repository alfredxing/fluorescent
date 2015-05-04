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
                    "id": 0,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 1,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 2,
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
                    "id": 3,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 4,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 5,
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
                    "id": 6,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(0,220,63,0.8)"
                },
                {
                    "id": 7,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 8,
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
                    "id": 9,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 10,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 11,
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
                    "id": 12,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 13,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 14,
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
                    "id": 15,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 16,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 17,
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
                    "id": 18,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 19,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 20,
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
                    "id": 21,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 22,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 23,
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
                    "id": 24,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(242,197,10,0.8)"
                },
                {
                    "id": 25,
                    "pageTitle": "A page title",
                    "pageUrl": "http://www.google.com",
                    "createdOn": "Jun 02, 2015",
                    "content": "The quick brown fox jumps over the lazy dog.",
                    "attachTo": "",
                    "color": "rgba(7,198,240,0.8)"
                },
                {
                    "id": 26,
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
