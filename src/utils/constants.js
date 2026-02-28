// 获取资源基础路径
const getAssetUrl = (path) => {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

// 音乐列表
export const MUSIC_LIST = [
  {
    id: 1,
    title: 'Celebrity',
    artist: '星游记',
    src: getAssetUrl('assets/music/Celebrity.mp3')
  },
  {
    id: 2,
    title: 'The Rain',
    artist: '星游记',
    src: getAssetUrl('assets/music/The Rain.mp4')
  },
  {
    id: 3,
    title: '在飞行',
    artist: '星游记',
    src: getAssetUrl('assets/music/zaifeixing.mp3')
  },
  {
    id: 4,
    title: '天空之城',
    artist: '星游记',
    src: getAssetUrl('assets/music/天空之城.mp4')
  }
]

// 轮播图列表
export const CAROUSEL_IMAGES = [
  getAssetUrl('assets/image/lunbo1.png'),
  getAssetUrl('assets/image/lunbo2.png'),
  getAssetUrl('assets/image/lunbo3.png'),
  getAssetUrl('assets/image/lunbo4.png'),
  getAssetUrl('assets/image/lunbo5.png')
]

// 角色列表
export const CHARACTERS = [
  {
    id: 1,
    name: '麦当',
    image: getAssetUrl('assets/image/mai.png'),
    description: '主角，勇敢的少年',
    fullDescription: '一个充满梦想的少年，为了寻找传说中的彩虹海而踏上冒险旅程。他勇敢、善良，永不放弃，是团队的核心人物。',
    abilities: ['强大的战斗力', '领导能力', '永不放弃的精神'],
    quote: '我一定要找到彩虹海！'
  },
  {
    id: 2,
    name: '米龙',
    image: getAssetUrl('assets/image/mi.png'),
    description: '麦当的伙伴',
    fullDescription: '麦当最忠实的伙伴，虽然看起来弱小，但在关键时刻总能发挥重要作用。聪明机智，是团队的智囊。',
    abilities: ['智慧过人', '敏捷身手', '忠诚可靠'],
    quote: '麦当，我会一直陪着你！'
  },
  {
    id: 3,
    name: '古多',
    image: getAssetUrl('assets/image/gudong.png'),
    description: '强大的战士',
    fullDescription: '拥有强大力量的战士，外表冷酷但内心善良。加入麦当的队伍后，成为了最可靠的战斗力量。',
    abilities: ['超强力量', '战斗技巧', '保护伙伴'],
    quote: '力量是用来保护重要的人的。'
  },
  {
    id: 4,
    name: '迪亚',
    image: getAssetUrl('assets/image/diya.png'),
    description: '神秘的角色',
    fullDescription: '身份神秘的角色，拥有特殊的能力。在旅途中给予麦当许多帮助和指引。',
    abilities: ['神秘力量', '预知能力', '治愈术'],
    quote: '命运会指引你找到答案。'
  },
  {
    id: 5,
    name: '咕咚',
    image: getAssetUrl('assets/image/gud.png'),
    description: '可爱的伙伴',
    fullDescription: '团队中的开心果，虽然有时候会闯祸，但总能在关键时刻带来惊喜。',
    abilities: ['搞笑天赋', '运气爆棚', '团队润滑剂'],
    quote: '咕咚咕咚！'
  },
  {
    id: 6,
    name: '老板',
    image: getAssetUrl('assets/image/laoban.png'),
    description: '智慧的长者',
    fullDescription: '经验丰富的长者，为麦当的冒险提供了许多宝贵的建议和帮助。',
    abilities: ['丰富经验', '战略规划', '人脉广泛'],
    quote: '年轻人，路还很长。'
  }
]
