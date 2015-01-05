R:

	Rscript -e "rmarkdown::render('data/tsarnaev-cards.Rmd')"
	open data/tsarnaev-cards.html

R_deploy:

	cp data/tsarnaev-cards.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/tsarnaev-cards_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/tsarnaev-cards.html