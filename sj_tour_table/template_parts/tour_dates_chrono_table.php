<?php 	

$acf_data = get_query_var( 'acf_data' );
$table_headings = ["Tours", 'Dates', 'Availability'];
$all_dates = [];

?>


<table class="sj-dates-chrono-table">

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
	foreach ($acf_data as $tour) {

		foreach ( $tour['tourDates']['date'] as $key => $value) {

			if (!empty($value)) {


				$convert_start_date = str_replace(".","-", trim(before('-', $value['date'] )));
				$convert_end_date = str_replace(".","-", trim(after('-', $value['date'] )));

				$year = '20' . substr($convert_start_date, 6, 2);
				$convert_start_date = substr($convert_start_date, 0, -2);
				$convert_start_date .= $year;

				$convert_end_date = substr($convert_end_date, 0, -2);
				$convert_end_date .= $year;

				$startDate = strtotime($convert_start_date);
				$endDate = strtotime($convert_end_date);

				if ($value['date'] != "Custom") {
					array_push(	$all_dates, array( 'startdate' => $startDate, 'enddate' => $endDate, 'tour' => $tour['tour'], 'availibility' => $value['availibility']));
				}


			} 

			// print_r($all_dates);

		}
	} 

	array_multisort (array_column($all_dates, 'startdate'), SORT_ASC, $all_dates);

	foreach ($all_dates as $key => $date) {

		if ($date['startdate'] != '') {
			$startDate = date("d-m-Y", $date['startdate']);
			$endDate = date("d-m-Y", $date['enddate']);

			$dateOutput = str_replace('-', '.', $startDate) . " - " . str_replace('-', '.', $endDate);
		



		// $startDate = date("d-m-Y", $date['startdate']);
		// $endDate = date("d-m-Y", $date['enddate']);

		echo "<tr>";
		echo "<td>" . $date['tour'] . "</td>";
		echo "<td>" . $dateOutput . "</td>";

		if ($date['availibility'] == 'Available') {
			echo "<td class='option-available'>" . $date['availibility'] . "</td>";
		} else if ($date['availibility'] == 'Only a few spots left') {

			echo "<td class='option-limited'>" . $date['availibility'] . "</td>";
		} else if ($date['availibility'] == 'Fully Booked') { 

			echo "<td class='option-not-available'>" . $date['availibility'] . "</td>";
		} else {
			echo "<td class='option-error'>" . $date['availibility'] . "</td>";
		}
		
		echo "</tr>";

		} 
	}

	?>

</table>