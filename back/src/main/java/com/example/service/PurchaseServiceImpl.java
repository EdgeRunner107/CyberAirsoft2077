package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.PurchaseDAO;
import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;

@Service
public class PurchaseServiceImpl implements PurchaseService{
	@Autowired
	PurchaseDAO dao;
	
	@Transactional
	@Override
	public void insertPurchase(PurchaseVO vo) {
		dao.insertPurchase(vo); //구매정보입력
		List<OrderVO> orders=vo.getOrders();
		
		for(OrderVO order:orders) {
			order.setOid(vo.getOid());
			dao.insertOrder(order);//구매상품들입력
		}
	}

}
