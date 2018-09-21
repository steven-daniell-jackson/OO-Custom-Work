<div class="sj-form-container left">
	<form id="sj-add-product-form" action="" method="post">

		<div class="product-name">
			<h2>Product Name</h2>
			<input class="sj-input-full" name="productName" type="text" id="productName" required>
		</div>

		<div class="product-categories">
			<h2>Product Categories</h2>
			<fieldset class="categories-radio" required>
				<?php getWoocommerceCategories() ?>
				<fieldset>
				</div>

				<div class="product-tags">
					<h2>Product tags</h2>
					<input class="sj-input-full" type="text" name="tags" id="productTags" placeholder="tag1, tag2, tag3" required><br>
					<label>Seperate tags with commas</label>
				</div>

				<div class="product-description">
					<h2>Description</h2>
					<textarea class="sj-input-full" type="text" name="description" id="description" placeholder="" required></textarea>
				</div>

				<div class="product-upload">
					<h2>Upload image</h2>

					<label for="upload_image">
						<input id="upload_image" type="text" size="36" name="image" value="" disabled="disabled" required/> 
						<input id="upload_image_button" class="button" type="button" value="Select File" />
						<br />Minimum resolution is 3.8 MP (2400 x 1600 pixels)
					</label>

				</div>

				<div class="license-upload">
					<div class="sj-half">	
						<h2>Model release form</h2>


						<label for="upload_image">
							<input id="upload_model_release" type="text" size="36" name="image" value="" disabled="disabled" required/> 
							<input id="upload_model_release_button" class="button" type="button" value="Select File" />
						</label>
					</div>
					<div class="sj-half">	
						<h2>Property release form</h2>

						<label for="upload_image">
							<input id="upload_property_release" type="text" size="36" name="image" value="" disabled="disabled" required/> 
							<input id="upload_property_release_button" class="button" type="button" value="Select File" />
						</label>
					</div>
				</div>
				<br><br>

<input type="checkbox" name="terms" value="" required> I verify that I have read the <a href="#" target="_blank">Terms and Conditions</a> and agree on them.<br>
				<br><br>

				<input type="submit" value="Submit Photo">


			</form>

		</div>

		<div class="sj-requirements-container left">

			<div class="sj-block">
				<div class="sj-block-header">
					Photo requirements:
				</div>
				<div class="sj-block-content">
					Photo's must be in JPEG/JPG format with an RGB colour space <br><br>
					Minimum resolution is 3.8 MP (2400x1600) <br><br>

					Photos may not be larger than 50 MB
				</div>
			</div>


			<div class="sj-block">
				<div class="sj-block-header">
					Downloads:
				</div>
				<div class="sj-block-content">
					<div class="downloads-block">
						<span>Model release form:</span> <a target="_blank" href="https://s3-eu-west-1.amazonaws.com/braveartwpmedia-irl/wp-content/uploads/2018/07/Model-release-form-2018.pdf"><img src="http://braveart.openorigin.co.za/wp-content/plugins/sj_custom_woocommerce_add_product/assests/download-btn.png" alt=""></a>
					</div>
					<div class="downloads-block">
					<span>Property release form:</span><a target="_blank" href="https://s3-eu-west-1.amazonaws.com/braveartwpmedia-irl/wp-content/uploads/2018/07/Property-release-form-2018.pdf"><img src="http://braveart.openorigin.co.za/wp-content/plugins/sj_custom_woocommerce_add_product/assests/download-btn.png" alt=""></a>
					</div>
				</div>
			</div>
			
		</div>