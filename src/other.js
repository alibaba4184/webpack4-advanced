console.log('大家好哈')
import $ from 'jquery'
export const a = 4;

$(function () {
    $('<div></div>').html('other').appendTo('body')
})