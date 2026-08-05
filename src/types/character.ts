/** 角色数据结构 */
export interface Character {
  id: number
  name: string
  image: string
  description: string
  fullDescription?: string
  abilities?: string[]
  quote?: string
}
