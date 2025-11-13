import Config from '../config.js';
import Repo from '../repo.js';
import { formatRub, plural } from '../utils.js';

export function itemId($item) {
  const $ = window.jQuery;
  return String($item.data('id') || $item.find('a[href*="product-item"]').first().text().trim() || 'unknown');
}

export function selectedIds() {
  const $ = window.jQuery;
  return $(Config.selectors.cartItem + '.selected').map(function () { return itemId($(this)); }).get();
}

export function removeSelectedFromDom() {
  const $ = window.jQuery;
  $(Config.selectors.cartItem + '.selected').each(function () {
    const $it = $(this); const $hr = $it.next('.light-line'); $it.remove(); if ($hr.length) $hr.remove();
  });
}

export function refreshSummary() {
  const $ = window.jQuery;
  const totals = Repo.totals();
  const $summary = $(Config.selectors.summaryBox); if (!$summary.length) return;

  const $topRow = $summary.find('.d-flex.align-items-center.justify-content-between').first();
  if ($topRow.length) {
    const $p = $topRow.find('p');
    $p.eq(0).text(totals.count + ' ' + plural(totals.count, ['товар', 'товара', 'товаров']));
    $p.eq(1).text(formatRub(totals.sum));
  }
  const $sumText = $summary.find('.ff-oswald.fw-semibold.text-lg').last();
  if ($sumText.length) { $sumText.text(formatRub(totals.sum)); }
}

export function updateDeleteBtnState() {
  const $ = window.jQuery;
  const any = $(Config.selectors.cartItem + '.selected').length > 0;
  $(Config.selectors.deleteBtn).prop('disabled', !any).toggleClass('disabled', !any);
}

export function renderFromStorage() {
  const $ = window.jQuery;
  const $list = $(Config.selectors.cartList);
  if (!$list.length) return;

  const items = Object.values(Repo.get().items);
  $list.empty();

  if (!items.length) {
    $list.html('<p class="text-center py-5">Корзина пуста</p>');
    refreshSummary();
    updateDeleteBtnState();
    return;
  }

  const min = Config.qty.min, max = Config.qty.max;

  items.forEach(item => {
    $list.append(`
      <div class="cart-item" data-id="${item.id}">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-3 col-6 order-1">
            <img src="${item.image}" alt="${item.name}" class="img-fluid">
          </div>
          <div class="col-lg-3 col-6 order-2">
            <div class="w-100 text-center">
              <p class="mb-sm-4 mb-0">Название</p>
              <a href="product-item.html" class="fw-semibold hover-custom-red ff-oswald text-corp text-md">${item.name}</a>
            </div>
          </div>
          <div class="col-lg-3 order-lg-3 order-4">
            <div class="w-100 d-flex flex-lg-column align-items-center text-center">
              <p class="mb-lg-4 mb-0 me-lg-0 me-4">Кол-во</p>
              <div class="number-input">
                <button class="minus">−</button>
                <input type="number" value="${item.qty}" min="${min}" max="${max}">
                <button class="plus">+</button>
              </div>
            </div>
          </div>
          <div class="col-lg-3 order-lg-4 order-3">
            <div class="w-100 d-flex flex-lg-column align-items-center text-center">
              <p class="mb-lg-4 mb-0 me-lg-0 me-4">Цена</p>
              <p class="mb-0 text-md fw-semibold ff-oswald">${formatRub(item.price)}</p>
            </div>
          </div>
        </div>
        <hr class="light-line">
      </div>
    `);
  });

  refreshSummary();
  updateDeleteBtnState();
}
