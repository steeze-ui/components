export type FlexDisplay = 'flex' | 'inline-flex'
export type FlexDirection = 'column' | 'row' | 'column-reverse' | 'row-reverse'
export type FlexJustifyContent =
	| 'center'
	| 'flex-start'
	| 'flex-end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
export type FlexAlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch'
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type FlexFlow = `${FlexDirection} ${FlexWrap}`
