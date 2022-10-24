package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.GlassWater: ImageVector
    get() {
        if (_glassWater != null) {
            return _glassWater!!
        }
        _glassWater = Builder(name = "GlassWater", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.2f, 22.0f)
                horizontalLineTo(8.8f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -2.0f, -1.79f)
                lineTo(5.0f, 3.0f)
                horizontalLineToRelative(14.0f)
                lineToRelative(-1.81f, 17.21f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 15.2f, 22.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(6.0f, 12.0f)
                arcToRelative(5.0f, 5.0f, 0.0f, false, true, 6.0f, 0.0f)
                arcToRelative(5.0f, 5.0f, 0.0f, false, false, 6.0f, 0.0f)
            }
        }
        .build()
        return _glassWater!!
    }

private var _glassWater: ImageVector? = null
