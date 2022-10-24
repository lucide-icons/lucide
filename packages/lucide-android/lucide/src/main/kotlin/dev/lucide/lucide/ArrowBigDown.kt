package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.ArrowBigDown: ImageVector
    get() {
        if (_arrowBigDown != null) {
            return _arrowBigDown!!
        }
        _arrowBigDown = Builder(name = "ArrowBigDown", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 3.0f)
                horizontalLineToRelative(6.0f)
                verticalLineToRelative(11.0f)
                horizontalLineToRelative(4.0f)
                lineToRelative(-7.0f, 7.0f)
                lineToRelative(-7.0f, -7.0f)
                horizontalLineToRelative(4.0f)
                close()
            }
        }
        .build()
        return _arrowBigDown!!
    }

private var _arrowBigDown: ImageVector? = null
