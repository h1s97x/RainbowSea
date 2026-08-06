import { resolveAssetUrl } from '@/utils/asset'
import type { Character } from '@/types/character'

/** 角色列表：星游记（Rainbow Sea）主要角色 */
export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: '麦当',
    image: resolveAssetUrl('assets/image/mai.png'),
    description: '主角 · "红魔鬼"麦林之子',
    fullDescription:
      '本作主角，"红魔鬼"麦林的儿子，一名向往自由的"自由者"。他乐观开朗、永不言弃，以肉包拳、拉面金箍棒等独特招式闻名。与父亲麦林约定五年后于彩虹海相见，为此踏上了寻找传说中彩虹海的星际旅程。',
    abilities: ['肉包拳', '拉面金箍棒', '彩虹石力量', '永不放弃的精神'],
    quote: '星空之所以美丽，是因为在无限的宇宙中，不管黑暗如何蔓延，都有星星的光芒去把它照亮。'
  },
  {
    id: 2,
    name: '咕咚·萌西',
    image: resolveAssetUrl('assets/image/gudong.png'),
    description: '亚亚罗星球国王 · 被变成兔子的王',
    fullDescription:
      '亚亚罗星球的国王，因为一场变故被变成了一只兔子，成为本作的核心伙伴之一。看似胆小爱闹，实则内心善良、重情重义。在麦当的影响下逐渐找回了作为国王的勇气与担当，是麦当最信赖的伙伴。',
    abilities: ['国王的气魄', '对亚亚罗的思念', '关键时刻的决断'],
    quote: '我是亚亚罗的国王！'
  },
  {
    id: 3,
    name: '笛亚',
    image: resolveAssetUrl('assets/image/diya.png'),
    description: '太阳系最后一个星学家',
    fullDescription:
      '太阳系最后一个星学家，聪慧冷静、温柔坚强。她背负着星学家的宿命与沉重的过去，在遇见麦当后渐渐敞开心扉。凭借星学家的知识与智慧，她在旅途中多次化解危机，是团队不可或缺的智囊。',
    abilities: ['星学知识', '彩虹石力量', '缜密的头脑', '温柔的坚强'],
    quote: '有些事，即使知道结果，也依然要去做。'
  },
  {
    id: 4,
    name: '米龙',
    image: resolveAssetUrl('assets/image/mi.png'),
    description: '"格斗螺旋"篇的传奇战士',
    fullDescription:
      '第二代米龙，"格斗螺旋"篇的核心人物。他并非麦当的早期伙伴，而是一位在格斗螺旋擂台上被麦当的真诚所感化的战士。他背负着前代米龙的名字与过去，在与麦当的对决中找回自我，成为深受观众喜爱的传奇角色。',
    abilities: ['格斗螺旋', '金色牛角', '超越极限的意志'],
    quote: '我米龙，是来打败你的！'
  },
  {
    id: 5,
    name: '红眼罗曼',
    image: resolveAssetUrl('assets/image/gud.png'),
    description: '神秘的五色眼之一',
    fullDescription:
      '神秘的"五色眼"成员之一，一双红眼令人印象深刻。他看似冷酷无情，却与麦当之间有着复杂而深刻的羁绊，其真实目的与立场始终成谜，是贯穿剧情的重要角色。',
    abilities: ['五色眼之力', '深不可测的实力', '神秘的过去'],
    quote: '麦当你还不明白吗？'
  },
  {
    id: 6,
    name: '麦林',
    image: resolveAssetUrl('assets/image/laoban.png'),
    description: '"红魔鬼" · 麦当的父亲',
    fullDescription:
      '被称为"红魔鬼"的伟大探险家，麦当的父亲。他曾经抵达过传说中的彩虹海，并将一切记录在案，却被世人误解与嘲笑。他与麦当立下"五年后彩虹海再见"的约定，是麦当冒险旅程最初的动力。',
    abilities: ['传说中的探险家', '抵达过彩虹海', '深沉的父爱'],
    quote: '麦当，五年后，我们在彩虹海见！'
  },
  {
    id: 7,
    name: '克拉',
    image: resolveAssetUrl('assets/image/laoban.png'),
    description: '野心勃勃的钢铁指挥官',
    fullDescription:
      '率领钢铁军团的野心家，为了追寻传说中的力量不择手段。他遵循着冰冷的"钢铁规则"，蔑视感情与梦想，是麦当一行在旅程中遭遇的最强对手之一。',
    abilities: ['钢铁军团', '彩虹石力量', '冷酷的谋略'],
    quote: '感情，不过是弱者的借口。'
  },
  {
    id: 8,
    name: '熊猫阿姨',
    image: resolveAssetUrl('assets/image/gud.png'),
    description: '地球篇的重要角色',
    fullDescription:
      '地球篇中出现的重要角色，经营着一家餐馆。她看似普通，却在麦当的成长中扮演了重要的角色，是地球篇里温暖人心的一员。',
    abilities: ['热心肠', '照顾后辈', '地球的守望者'],
    quote: '麦当，好好吃饭，好好长大。'
  }
]
