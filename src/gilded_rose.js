const ITEM_NAMES = require('./gilded_rose.constant')
Object.freeze(ITEM_NAMES)

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(this.processItems.bind(this))
  }

  processItems(item) {
    switch (item.name) {
      case ITEM_NAMES.AGED_BRIE:
        return this.processAgedBrie(item);
      case ITEM_NAMES.SULFURAS:
        return this.processSulfuras(item);
      case ITEM_NAMES.BACKSTAGE_PASS:
        return this.processBackstagePass(item);
      case ITEM_NAMES.CONJURED:
        return this.processConjured(item);
      default:
        return this.processNonSpecialItem(item)
    }
  }

  processNonSpecialItem(item) {
    const { sellIn } = item
    const qualityIncreaseBy = sellIn <= 0 ? 2 : 1;
    this.decreaseSellin(item, 1)
    this.decreaseQuality(item, qualityIncreaseBy)
    return item
  }

  processAgedBrie(item) {
    const { sellIn } = item;
    const qualityIncreaseBy = sellIn > 0 ? -1 : -2;
    this.decreaseQuality(item, qualityIncreaseBy);
    this.decreaseSellin(item, 1)
    return item
  }

  processSulfuras(item) {
    this.decreaseSellin(item, 0)
    this.decreaseSellin(item, 0)
    return item
  }

  processBackstagePass(item) {
    const { sellIn } = item;
    let qualityIncreaseBy
    if (sellIn <= 5) {
      qualityIncreaseBy = -3
    } else if (sellIn <= 10) {
      qualityIncreaseBy = -2
    } else {
      qualityIncreaseBy = -1
    }

    this.decreaseQuality(item, qualityIncreaseBy);
    this.decreaseSellin(item, 1)
    return item
  }

  processConjured(item) {
    const { sellIn } = item;
    const qualityIncreaseBy = sellIn > 0 ? 2 : 4;
    this.decreaseQuality(item, qualityIncreaseBy);
    this.decreaseSellin(item, 1)
    return item
  }

  decreaseSellin(item, value) {
    item.sellIn -= value
    return item
  }

  decreaseQuality(item, value) {
    const max = 50;
    const min = 0;
    const newQuality = item.quality -= value
    item.quality = newQuality > 0 ? Math.min(max, newQuality) : Math.max(min, newQuality)
    return item
  }
}
module.exports = {
  Item,
  Shop
}
