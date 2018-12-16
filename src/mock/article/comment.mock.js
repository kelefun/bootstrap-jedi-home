import Mock from 'mockjs'

Mock.mock(/comments\.json/, {
    's|1':true,
    'c':0,
    'm':'哎呦,出错了',
    'd|1-5': [{
        'id|+1': 1,
        'nickname|1':['小明','中山君','可乐破啦'],
        'agree|10-100': 0,
        'content|1':['你说的对','哈哈','感谢分享🙏']
    }]
})

