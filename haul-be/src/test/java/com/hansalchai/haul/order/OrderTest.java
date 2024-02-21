package com.hansalchai.haul.order;

import org.junit.jupiter.api.Test;

import com.hansalchai.haul.order.constants.OrderStatusCategory;

public class OrderTest {

	@Test
	void valueOf() {
		String keyword = "운송 전";
		OrderStatusCategory orderStatusCategory = OrderStatusCategory.findOrderByCode(keyword);
		System.out.println(orderStatusCategory);
	}
}
