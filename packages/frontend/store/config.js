import { CardsViewTypes } from 'fanartweb-shared'

export const state = () => ({
    cardsViewType: CardsViewTypes.NORMAL,
})

export const mutations = {
    setCardsViewType(state, value) {
        state.cardsViewType = value
    }
}