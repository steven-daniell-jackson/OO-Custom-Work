<?php 	

$tour_data = get_query_var( 'acf_data' );
$currency = get_query_var( 'currency' );
$table_headings = ["Tours", 'BMW F700GS', 'BMW F800GS', 'BMW R1200GS LC', 'BMW R1200RT', 'Pillion', 'Single Room Surcharge'];
$maximum_bike_count = 4;
$bike_list = ['BMW F700GS', 'BMW F800GS', 'BMW R1200GS LC', 'BMW R1200RT'];
?>


<table class="sj-tour-pricelist-table">

	<tr>	
		<?php 	

// Table Headings

		foreach ($table_headings as $value) {
			echo "<th>$value</th>";
		}

		?>

	</tr>

	<?php 	

// Tour Data
	foreach ($tour_data as $tour) {
		echo "<tr>";
		echo "<td>".$tour['tour']."</td>";

		$bike_checklist = [];
		foreach ($bike_list	 as $key => $value) {
			$bike_checklist[$value] = '';
		}

		for ($i=0; $i < $maximum_bike_count; $i++) { 
			foreach ($tour['tourBikes']['bikes'] as $value) {


				if (!empty($value)) {
					
					foreach ($bike_list	 as $key => $bike) {
						if ($value["bikeName"] == $bike 	) {

							$bike_checklist[$value["bikeName"]] = $value["bikePrice"];

						}
					}

					

				}
				
			}

		}

		foreach ($bike_checklist as $key => $bike) {

			if ( !$bike == "") {
				echo "<td>$currency ".number_format($bike). ".00</td>";
			} else {
				echo "<td>N/A</td>";
			}

		}		

		if (is_numeric($tour['pillionPrice'])) {
			echo "<td>$currency ".number_format($tour['pillionPrice']).".00</td>";
		} else {
			echo "<td>".$tour['pillionPrice']."</td>";
		}


		if (is_numeric($tour['singleRoomPrice'])) {
			echo "<td>$currency ".number_format($tour['singleRoomPrice']).".00</td>";
		} else {
			echo "<td>".$tour['singleRoomPrice']."</td>";
		}
		
		
		echo "</tr>";
	} 
	?>

</table>