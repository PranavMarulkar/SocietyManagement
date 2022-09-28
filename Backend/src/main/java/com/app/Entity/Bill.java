package com.app.Entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "bill")
public class Bill extends BaseId{

	private Date b_date;
	
	@Column(length = 30)
	private int b_amount;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="flat_id")
	private Flatowner flatowner;
}
