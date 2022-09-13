(() => {

    let yOffset = 0 // window.pageYOffset
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 센션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬

    const sceneInfo = [
        {
            //0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values:{
                messageA_opacity : [0,1],
            }
        },
        {
            //1
            type : 'normal',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-1')
            },
        },
        {
            //2
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-2')
            },
        },
        {
            //3
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-3')
            },
        },
    ];

    function setLayout(){
    //    각스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight > yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute("id", `show-scene-${currentScene}`)
    }

    function calcValues(values,currentYOffset){
        let rv;
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0];
        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene){
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    function scrollLoop(){
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene ++;
            document.body.setAttribute("id", `show-scene-${currentScene}`)
        }
        if(yOffset < prevScrollHeight){
            if(currentScene === 0) return;
            currentScene --;
            document.body.setAttribute("id", `show-scene-${currentScene}`)
        }

        playAnimation();
    }

    window.addEventListener('resize',setLayout);
    window.addEventListener('load',setLayout);
    window.addEventListener('scroll',() => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
})();