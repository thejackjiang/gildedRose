var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  describe('normal item', () => {
    it('quality cannot go below 0', () => {
      const items = [new Item('normal item', 0, 0)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('normal item', -1, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
    it('quality cannot go below 0 quality and will decrement quality by 2 if sellin is <= 0', () => {
      const items = [new Item('normal item', 0, 2)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('normal item', -1, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
    it('decrements by 1 for sellin and quality', () => {
      const items = [new Item('normal item', 1, 1)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('normal item', 0, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
    it('decrements by 1 for sellin and 2 for quality if sellin is negative', () => {
      const items = [new Item('normal item', -1, 2)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('normal item', -2, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
    it('decrements by 1 for sellin and 2 for quality if sellin is negative, but wont go lower than 0', () => {
      const items = [new Item('normal item', -1, 1)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('normal item', -2, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
  })

  describe('Aged Brie', () => {
    it('aged brie increases in quality', () => {
      const items = [new Item('Aged Brie', 1, 0)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Aged Brie', 0, 1)]
      expect(updatedItems).toEqual(expectedValue)
    })

    it('aged brie increases in quality by 2 if sellin is negative', () => {
      const items = [new Item('Aged Brie', 0, 0)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Aged Brie', -1, 2)]
      expect(updatedItems).toEqual(expectedValue)
    })

    it('aged brie increases in quality but wont pass 50', () => {
      const items = [new Item('Aged Brie', 0, 50)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Aged Brie', -1, 50)]
      expect(updatedItems).toEqual(expectedValue)
    })
  })
  
  describe('Sulfuras, Hand of Ragnaros', () => {
    it('sulfuras does not change', () => {
      const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 0)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Sulfuras, Hand of Ragnaros', 0, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
  })

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('increase quality by 2 when sellin is 10 or less', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 22)]
      expect(updatedItems).toEqual(expectedValue)
    })
    it('increase quality by 3 when sellin is 5 or less', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Backstage passes to a TAFKAL80ETC concert', 4, 23)]
      expect(updatedItems).toEqual(expectedValue)
    })
  })

  describe('Conjured', () => {
    it('conjured decreases in quality twice as fast', () => {
      const items = [new Item('Conjured', 2, 10)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Conjured', 1, 8)]
      expect(updatedItems).toEqual(expectedValue)
    })

    it('conjured decreases four times as fast if sellin is less than 0', () => {
      const items = [new Item('Conjured', 0, 10)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Conjured', -1, 6)]
      expect(updatedItems).toEqual(expectedValue)
    })

    it('Conjured decreases in quality but wont go negative', () => {
      const items = [new Item('Conjured', 0, 0)]
      const shop = new Shop(items)
      const updatedItems = shop.updateQuality()
      const expectedValue = [new Item('Conjured', -1, 0)]
      expect(updatedItems).toEqual(expectedValue)
    })
  })
});
