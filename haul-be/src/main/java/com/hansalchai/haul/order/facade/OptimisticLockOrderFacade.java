package com.hansalchai.haul.order.facade;

import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Component;

import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.order.dto.OrderRequest;
import com.hansalchai.haul.order.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class OptimisticLockOrderFacade {

	private final OrderService orderService;

	public void approveV2(Long userId, OrderRequest.ApproveRequestDto approveRequestDto) throws InterruptedException {
		while (true) {
			try {
				orderService.approveV2(userId, approveRequestDto);
				break;
			} catch (ConflictException e) {
				log.error("[ConflictException] {}", e.getMessage());
				break;
			} catch (ObjectOptimisticLockingFailureException e) {
				log.error(e.getMessage());
				Thread.sleep(50);
			}
		}
	}
}
